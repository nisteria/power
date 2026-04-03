// Push Notification Service - Firebase
import admin from 'firebase-admin';

export async function sendPushNotification(token: string, title: string, body: string) {
  const message = {
    notification: { title, body },
    token,
  };
  return admin.messaging().send(message);
}

export async function sendToTopic(topic: string, title: string, body: string) {
  const message = {
    notification: { title, body },
    topic,
  };
  return admin.messaging().send(message);
}

export async function subscribeToTopic(token: string, topic: string) {
  return admin.messaging().subscribeToTopic(token, topic);
}
