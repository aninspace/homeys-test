<template>
  <Toaster/>

  <button class="btn" @click="showNotification">Click me</button>
</template>

<script setup lang="ts">
import Toaster from "./components/BaseNotification.vue";
import {useToasterStore, type ToastType} from "./stores/useToasterStore";

const toasterStore = useToasterStore();

const NotificationTypes: ToastType[] = ["warning", "error", "info", "success"]
const showNotification = () => {
  // Generate a random type of notification
  const index = Math.floor(Math.random() * NotificationTypes.length)
  const randTypeOfNotification: ToastType = NotificationTypes[index]
  toasterStore.create({
    title: "Modal Window",
    text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et\ndolore magna aliqua.",
    timeout: undefined // If set the notification will disappear by itself
  }, randTypeOfNotification)
};
</script>

<style scoped lang="scss"></style>
