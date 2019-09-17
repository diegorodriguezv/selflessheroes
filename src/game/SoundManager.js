const soundDefs = [{
  key: 'fireworks_sfx'
}, {
  key: 'tests_sfx',
  config: {
    loop: true,
    volume: 0.5
  }
}, {
  key: 'hero_scream_sfx',
  config: {
    volume: 0.05
  }
}, {
  key: 'npc_scream_sfx',
  config: {
    volume: 0.1
  }
}, {
  key: 'step_sfx',
  config: {
    volume: 1
  }
}, {
  key: 'fireball_sfx',
  config: {
    volume: 0.5
  }
}, {
  key: 'write_sfx',
  config: {
    volume: 0.05
  }
}, {
  key: 'light_sfx',
  config: {
    volume: 0.1
  }
}, {
  key: 'spikes_on_sfx',
  config: {
    volume: 0.1
  }
}, {
  key: 'spikes_off_sfx',
  config: {
    volume: 0.1
  }
}]

export default class SoundManager {
  constructor(scene) {
    this.scene = scene
    this.volumePreference = null
    this.sound = scene.sound
    this.sounds = new Map()
    this.initSounds()
    this.onVolumePreferenceChange = this.onVolumePreferenceChange.bind(this)
  }

  initSounds() {
    for (let soundDef of soundDefs) {
      let sound = this.sound.add(soundDef.key, soundDef.config)
      this.sounds.set(soundDef.key, sound)
    }

    this.applyVolumePreference()
  }

  play(key, config) {
    this.sounds.get(key).play(config)
  }

  stop(key) {
    this.sounds.get(key).stop()
  }

  setVolumePreference(volumePreference) {
    if (this.volumePreference) {
      this.volumePreference.events.removeListener('change', this.onVolumePreferenceChange)
    }
    this.volumePreference = volumePreference
    this.volumePreference.events.on('change', this.onVolumePreferenceChange)
    this.applyVolumePreference()
  }

  onVolumePreferenceChange() {
    this.applyVolumePreference()
  }

  applyVolumePreference() {
    if (this.volumePreference) {
      this.sound.setVolume(this.volumePreference.volume)
      this.sound.setMute(this.volumePreference.mute)
    }
  }

  beforeDestroy() {
    if (this.volumePreference) {
      this.volumePreference.events.removeListener('change', this.onVolumePreferenceChange)
    }
  }
}