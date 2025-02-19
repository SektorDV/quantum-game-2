<template>
  <transition :name="gameState">
    <div v-if="explosion" :class="computeClass">
      <h2>
        Mine Exploded
      </h2>
    </div>
    <div v-else-if="victory" :class="computeClass">
      <div class="victory-circle">
        <h2>
          You won!
        </h2>
        <slot></slot>
      </div>
    </div>
  </transition>
</template>

<script lang="ts">
// TODO: Needs to be extended for instructions overlay
// FIXME: Rethink overlay
import { Vue, Component, Watch, Prop } from 'vue-property-decorator';
import { State, Getter, Mutation } from 'vuex-class';
import VueConfetti from 'vue-confetti';
import AppButton from '@/components/AppButton.vue';
import { GameStateEnum } from '@/engine/interfaces';

Vue.use(VueConfetti);

@Component({
  components: {
    AppButton
  }
})
export default class AppOverlay extends Vue {
  @Prop() readonly gameState!: GameStateEnum;
  $confetti!: {
    start: (params: any) => void;
    stop: () => void;
  };
  explosion: boolean = false;
  explosionTimeout: number = 0;

  mineExploding(): void {
    this.explosion = true;
    this.explosionTimeout = setTimeout(() => {
      this.explosion = false;
    }, 300);
  }

  get computeClass(): string[] {
    return [this.gameState.toString(), 'wrapper'];
  }

  get victory(): boolean {
    return this.gameState === GameStateEnum.Victory;
  }

  get mineExploded(): boolean {
    return this.gameState === GameStateEnum.MineExploded;
  }

  @Watch('gameState')
  handleGameStateChange(newGameState: GameStateEnum, oldGameState: GameStateEnum) {
    if (newGameState === GameStateEnum.Victory) {
      this.$confetti.start({
        particlesPerFrame: 3,
        defaultSize: 8,
        particles: [
          {
            dropRate: 15
          }
        ],
        defaultColors: [
          '#ffbb3b', // Q yellow
          '#5c00d3', // Q purple
          '#ff0055', // Q red
          '#ff8b00', // orange 01
          '#ff5d15', // orange 02
          '#ba00ff', // purple 02
          '#ffbb3b', // Q yellow
          '#5c00d3', // Q purple
          '#ff0055', // Q red
          '#ff8b00', // orange 01
          '#ff5d15', // orange 02
          '#ba00ff' // purple 02
        ]
      });
    } else if (newGameState === GameStateEnum.MineExploded) {
      this.mineExploding();
    } else if (oldGameState === GameStateEnum.Victory) {
      this.$confetti.stop();
    }
  }
}
</script>

<style lang="scss">
.Victory-enter-active,
.Victory-leave-active {
  transition: opacity 0.5s;
}
.Victory-enter,
.Victory-leave-to {
  opacity: 0;
}

.Victory.wrapper {
  display: flex;
  flex-direction: column;
  justify-content: center;
  & .victory-circle {
    width: 300px;
    height: 300px;
    border-radius: 150px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    margin: 10px;
    background: linear-gradient(#5c00d3, #ff0055, #fbb03b);
  }
  h2 {
    color: white;
    font-size: 2rem;
    margin: 10px;
  }
}

.MineExploded-enter,
.MineExploded-leave-to {
  opacity: 0;
}

.MineExploded.wrapper {
  opacity: 0.8;
  background: #ff0055;
}

.wrapper {
  height: 100vh;
  width: 100vw;
  position: fixed;
  z-index: 3;
  display: flex;
  align-items: center;
}
</style>
