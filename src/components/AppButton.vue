<template>
  <button :class="computeClass">
    <slot></slot>
  </button>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator';

@Component
export default class AppButton extends Vue {
  @Prop() readonly hoverColor!: string;
  @Prop({ default: 'basic' }) readonly type!: string;
  @Prop({ default: true }) readonly inline!: boolean;
  @Prop() readonly overlay!: boolean;

  get colorClass() {
    return this.hoverColor;
  }

  get computeClass() {
    return [this.type, this.inline && 'inline', this.overlay && 'overlay-btn'];
  }
}
</script>

<style scoped lang="scss">
button {
  display: inline-block;
  padding: 0;
  border: none;
  font: inherit;
  color: inherit;
  background-color: transparent;
  cursor: pointer;
  color: white;
  padding: 8px 20px;
  text-align: center;
  font-weight: bold;
  text-decoration: none;
  display: flex;
  font-size: 1rem;
  transition: 0.5s;
  align-items: center;
  &.inline {
    display: inline;
  }

  &.basic {
    background-color: #5c00d3;
    border-bottom: 4px solid #120223;
    &:hover {
      background-color: #4302bf;
      transition: 0.5s;
      text-decoration: none;
    }
  }

  &.special {
    background-color: #ff0055;
    border-bottom: 4px solid #890236;
    &:hover {
      background-color: #e80054;
      transition: 0.5s;
      text-decoration: none;
    }
  }

  &.big {
    background-color: #5c00d3;
    font-size: 1.5rem;
    border-bottom: 4px solid #120223;
    &:hover {
      background-color: #4302bf;
      transition: 0.5s;
      text-decoration: none;
    }
  }

  &.inactive {
    opacity: 0.3;
    cursor: initial;
    outline: none;
    &:hover {
      background-color: #ff0055;
      transition: none;
    }
  }

  &.overlay-btn {
    margin: 5px;
    text-decoration: none;
  }
}
</style>
