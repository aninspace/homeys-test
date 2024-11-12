<template>
  <Teleport to="body">
    <Transition name="toast">
      <div v-if="toastStore.toasts.length" class="toaster__wrapper">
        <TransitionGroup name="toast" tag="ul">
          <li
              v-for="toast in toastStore.toasts"
              :class="['toaster__inner', toastClassMap[toast.type]]"
              :key="toast.text"
          >
            <img :src="`/src/assets/icons/${toast.type}.svg`" class="toaster__inner-icon" alt="toster icon"/>
            <h1 class="toaster__inner-title">{{ toast.title }}</h1>
            <button @click="removeToast(toast.id)">
              <img src="/src/assets/icons/close.svg" class="toaster__inner-close" alt="close icon button"/>
            </button>
            <p class="toaster__inner-text">
              {{ toast.text }}
            </p>
          </li>
        </TransitionGroup>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup lang="ts">
import {type ToastType, useToasterStore} from "@/stores/useToasterStore";

const toastClassMap: Record<ToastType, string> = {
  warning: "warning",
  error: "error",
  success: "success",
  info: "info"
};

const toastStore = useToasterStore();

const removeToast = (id: string) => {
  toastStore.remove(id);
};
</script>

<style scoped lang="scss">
.toast-enter-from,
.toast-leave-to {
  transform: translateX(100%);
  opacity: 0;
}

.toast-enter-active,
.toast-leave-active {
  transition: 0.25s ease all;
}

.toaster {
  &__wrapper {
    position: fixed;
    bottom: 1rem;
    right: 1rem;

    z-index: 100;

    display: flex;
    flex-direction: column;
  }

  &__inner {
    --color: #424242;
    --sub-color: #757575;
    --backgound-color: #c4c4c4;
    --border-color: red;
    margin-bottom: 1rem;
    padding: 1.5rem;
    display: grid;
    column-gap: 1rem;
    row-gap: .5rem;
    grid-template-areas:
              "icon title close"
              ". text text";
    grid-template-columns: auto 1fr auto;
    justify-items: baseline;

    max-width: 527px;
    max-height: 160px;

    border-radius: 1rem;
    border: solid 2px;

    border-color: var(--border-color);
    background-color: var(--backgound-color);
    color: var(--color);

    svg {
      fill: var(--color);
      stroke: var(--color);
    }

    &.success {
      --backgound-color: #E4F7E8;
      --border-color: #89B291;
    }

    &.warning {
      --backgound-color: #F7F2E4;
      --border-color: #D4C296;
    }

    &.error {
      --backgound-color: #F7E4E4;
      --border-color: #D29393;
    }

    &.info {
      --backgound-color: #E4E9F7;
      --border-color: #96A8D8;
    }

    &-icon {
      width: 1.8rem;
      aspect-ratio: 1/1;
      grid-area: icon;
    }

    &-title {
      font-size: 20px;
      font-weight: 500;
      grid-area: title;
    }

    &-text {
      font-weight: 400;
      color: var(--sub-color);
      grid-area: text;
      text-overflow: ellipsis;
      overflow: hidden;
    }

    &-close {
      grid-area: close;
    }
  }
}
</style>
