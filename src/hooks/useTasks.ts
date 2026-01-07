import {useEffect} from 'react';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import {firebaseFirestore} from '../config/firebase';
import {
  collection,
  query,
  where,
  orderBy,
  onSnapshot,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
  Timestamp,
} from 'firebase/firestore';
import {
  setTasks,
  addTask as addTaskAction,
  updateTask as updateTaskAction,
  deleteTask as deleteTaskAction,
  toggleComplete as toggleCompleteAction,
  setLoading,
  setError,
} from '../store/taskSlice';
import type {Task} from '../store/taskSlice';
import type {RootState, AppDispatch} from '../store';
import NotificationService from '../services/notificationService';

export const useTasks = () => {
  const dispatch = useAppDispatch();
  const {tasks, isLoading, error} = useAppSelector(
    (state) => state.tasks,
  );
  const {user} = useAppSelector((state) => state.auth);

  useEffect(() => {
    if (!user) {
      dispatch(setTasks([]));
      return;
    }

    dispatch(setLoading(true));

    const db = firebaseFirestore();
    const tasksRef = collection(db, 'tasks');
    const q = query(
      tasksRef,
      where('userId', '==', user.uid),
      orderBy('createdAt', 'desc')
    );

    const unsubscribe = onSnapshot(
      q,
      snapshot => {
        const tasksData: Task[] = snapshot.docs.map(docSnapshot => {
          const data = docSnapshot.data();
          const task: Task = {
            id: docSnapshot.id,
            title: data.title,
            notes: data.notes,
            tag: data.tag,
            remindAt: data.remindAt?.toDate() || null,
            completed: data.completed,
            createdAt: data.createdAt.toDate(),
            updatedAt: data.updatedAt.toDate(),
            userId: data.userId,
          };

          return task;
        });
        dispatch(setTasks(tasksData));
      },
      err => {
        dispatch(setError(err.message));
      },
    );

    return () => unsubscribe();
  }, [user, dispatch]);

  const addTask = async (taskData: Omit<Task, 'id' | 'createdAt' | 'updatedAt' | 'userId'>) => {
    if (!user) return;

    try {
      const now = new Date();
      const newTask = {
        ...taskData,
        userId: user.uid,
        createdAt: Timestamp.fromDate(now),
        updatedAt: Timestamp.fromDate(now),
        remindAt: taskData.remindAt ? Timestamp.fromDate(taskData.remindAt) : null,
      };

      const db = firebaseFirestore();
      const tasksRef = collection(db, 'tasks');
      const docRef = await addDoc(tasksRef, newTask);
      
      const task = {
        ...taskData,
        id: docRef.id,
        userId: user.uid,
        createdAt: now,
        updatedAt: now,
      };

      dispatch(addTaskAction(task));

      if (task.remindAt && !task.completed) {
        NotificationService.scheduleTaskNotification(task);
      }
    } catch (err: unknown) {
      dispatch(setError((err as Error).message));
    }
  };

  const updateTask = async (taskId: string, updates: Partial<Task>) => {
    try {
      const now = new Date();
      const { remindAt, ...restUpdates } = updates;
      const updatedData: Record<string, unknown> = {
        ...restUpdates,
        updatedAt: Timestamp.fromDate(now),
      };

      if (remindAt !== undefined) {
        updatedData.remindAt = remindAt ? Timestamp.fromDate(remindAt) : null;
      }

      const db = firebaseFirestore();
      const taskRef = doc(db, 'tasks', taskId);
      await updateDoc(taskRef, updatedData);

      const task = tasks.find(t => t.id === taskId);
      if (task) {
        const updatedTask = {
          ...task,
          ...updates,
          updatedAt: now,
        } as Task;

        dispatch(updateTaskAction(updatedTask));

        if (updatedTask.remindAt && !updatedTask.completed) {
          NotificationService.scheduleTaskNotification(updatedTask);
        } else {
          NotificationService.cancelTaskNotification(taskId);
        }
      }
    } catch (err: unknown) {
      dispatch(setError((err as Error).message));
    }
  };

  const deleteTask = async (taskId: string) => {
    try {
      const db = firebaseFirestore();
      const taskRef = doc(db, 'tasks', taskId);
      await deleteDoc(taskRef);
      dispatch(deleteTaskAction(taskId));
      NotificationService.cancelTaskNotification(taskId);
    } catch (err: unknown) {
      dispatch(setError((err as Error).message));
    }
  };

  const toggleComplete = async (taskId: string) => {
    const task = tasks.find(t => t.id === taskId);
    if (!task) return;

    try {
      const now = new Date();
      dispatch(toggleCompleteAction({
        id: taskId,
        updatedAt: now.toISOString(),
      }));

      if (task.completed && task.remindAt) {
        NotificationService.scheduleTaskNotification({
          ...task,
          completed: false,
        });
      } else {
        NotificationService.cancelTaskNotification(taskId);
      }

      const db = firebaseFirestore();
      const taskRef = doc(db, 'tasks', taskId);
      await updateDoc(taskRef, {
        completed: !task.completed,
        updatedAt: Timestamp.fromDate(now),
      });
    } catch (err: unknown) {
      dispatch(setError((err as Error).message));
    }
  };

  return {
    tasks,
    isLoading,
    error,
    addTask,
    updateTask,
    deleteTask,
    toggleComplete,
  };
};
