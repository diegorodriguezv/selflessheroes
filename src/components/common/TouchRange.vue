<template>
<input type="range"
  :step="step"
  :min="min"
  :max="max"
  :disabled="disabled"
  :value="value"
  @input="emit($event.target.value)"
  @touchmove.prevent="touchmove"
  @touchstart.prevent="touchmove">
</template>

<script>
export default {
  props: {
    value: {
      type: Number,
      default: 0
    },
    min: {
      type: Number,
      default: 0
    },
    max: {
      type: Number,
      default: 1
    },
    step: {
      type: [Number, String],
      default: 'any'
    },
    disabled: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    range() {
      return this.max - this.min
    }
  },
  methods: {
    emit(val) {
      this.$emit('input', Number(val))
    },
    touchmove(e) {
      const width = e.target.clientWidth
      const rate = Math.max(0, Math.min(width, e.touches[0].pageX - e.target.getBoundingClientRect().x)) / width
      let value = rate * this.range + this.min
      if (typeof this.step === 'number') {
        value = Math.round(value / this.step) * this.step
      }
      this.emit(value)
    }
  }
}
</script>

<style lang="scss">
// Styling Cross-Browser Compatible Range Inputs with Sass
// Github: https://github.com/darlanrod/input-range-sass
// Author: Darlan Rod https://github.com/darlanrod
// Version 1.5.1
// MIT License

$track-color: #eceff1 !default;
$thumb-color: #607d8b !default;

$thumb-radius: 12px !default;
$thumb-height: 24px !default;
$thumb-width: 24px !default;
$thumb-shadow-size: 0 !default;
$thumb-shadow-blur: 6px !default;
$thumb-shadow-color: rgba(0, 0, 0, .2) !default;
$thumb-border-width: 2px !default;
$thumb-border-color: #eceff1 !default;

$track-width: 120px;
$track-width: 100% !default;
$track-height: 8px !default;
$track-shadow-size: 0 !default;
$track-shadow-blur: 1px !default;
$track-shadow-color: rgba(0, 0, 0, .2) !default;
$track-border-width: 2px !default;
$track-border-color: #cfd8dc !default;

$track-radius: 5px !default;
$contrast: 5% !default;

$ie-bottom-track-color: darken($track-color, $contrast) !default;

@mixin shadow($shadow-size, $shadow-blur, $shadow-color) {
    box-shadow: $shadow-size $shadow-size $shadow-blur $shadow-color, 0 0 $shadow-size lighten($shadow-color, 5%);
}

@mixin track {
    height: $track-height;
    transition: all 0.2s ease;
    width: $track-width;
}

@mixin thumb($adjustment: 0) {
    @include shadow($thumb-shadow-size, $thumb-shadow-blur, $thumb-shadow-color);
    background: $thumb-color;
    border: $thumb-border-width solid $thumb-border-color;
    border-radius: $thumb-radius;
    height: $thumb-height + $adjustment;
    width: $thumb-width + $adjustment;
}

[type='range'] {
    -webkit-appearance: none;
    background: transparent;
    margin: $thumb-height / 2 0;
    width: $track-width;

    &.inactive {
        opacity: 0.3;
    }

    &::-moz-focus-outer {
        border: 0;
    }

    &:focus {
        outline: 0;

        &::-webkit-slider-runnable-track {
            background: lighten($track-color, $contrast);
        }
    }

    &::-webkit-slider-runnable-track {
        @include track;
        @include shadow($track-shadow-size, $track-shadow-blur, $track-shadow-color);
        background: $track-color;
        border: $track-border-width solid $track-border-color;
        border-radius: $track-radius;
    }

    &::-webkit-slider-thumb {
        @include thumb;
        -webkit-appearance: none;
        margin-top: ((-$track-border-width * 2 + $track-height) / 2 - $thumb-height / 2);
    }

    &::-moz-range-track {
        @include shadow($track-shadow-size, $track-shadow-blur, $track-shadow-color);
        @include track;
        background: $track-color;
        border: $track-border-width solid $track-border-color;
        border-radius: $track-radius;
        height: $track-height / 2;
    }

    &::-moz-range-thumb {
        @include thumb(-4);
    }
}
</style>
