import {
  collection,
  addDoc,
  query,
  where,
  getDocs,
  doc,
  deleteDoc,
  orderBy,
} from "firebase/firestore";
import { db } from "../firebase";

export const addAppointment = async (appointment: any) => {
  const col = collection(db, "appointments");
  const ref = await addDoc(col, {
    ...appointment,
    createdAt: new Date(),
  });
  return ref.id;
};

export const getAppointmentsByUser = async (userId: string) => {
  const col = collection(db, "appointments");
  const q = query(col, where("userId", "==", userId), orderBy("createdAt", "desc"));
  const snap = await getDocs(q);
  return snap.docs.map((d) => ({ id: d.id, ...d.data() }));
};

export const cancelAppointment = async (appointmentId: string) => {
  const d = doc(db, "appointments", appointmentId);
  await deleteDoc(d);
};

export const getDoctors = async () => {
  const col = collection(db, "doctors");
  const snap = await getDocs(col);
  return snap.docs.map((d) => ({ id: d.id, ...d.data() }));
};

export const addReview = async (review: any) => {
  const col = collection(db, "reviews");
  const ref = await addDoc(col, { ...review, createdAt: new Date() });
  return ref.id;
};