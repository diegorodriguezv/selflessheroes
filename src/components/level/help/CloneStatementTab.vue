<template>
<div class="help-jump-statement-tab">
  <p v-bbcode>{{
		$text('level_help_tab_clone_statement_1')
	}}</p>

  <h5>{{$text('level_help_tab_statement_graph_code_example')}}</h5>
  <p>
    <div class="graph-code-container">
      <simple-graph-code :code="'clone w a\nstep(e)\na:'"
        :compilerConfig="defaultCompilerConfig" />
      <svg viewBox="0 0 100 126"
        style="height: 126px;"
        class="jump-link-layer">
        <path d="M 37 20 C 106 20, 73 112, 5 112"
          v-svgid.url="{
						id: '#arrow',
						attr: 'marker-end'
					}"
          class="link-line"></path>
      </svg>
    </div>

    <span v-bbcode>{{$text('level_help_tab_clone_statement_2')}}</span>
  </p>

  <br />
  <h5>{{$text('level_help_tab_statement_code_example')}}</h5>

  <p class="code"
    v-bbcode>{{$text('level_help_tab_clone_statement_3')}}</p>
  <br />
  <p v-bbcode>{{
		$text('level_help_tab_clone_statement_4')
	}}</p>
</div>
</template>

<script>
import SimpleGraphCode from './SimpleGraphCode'
import CompilerConfig from '../../../world/ai/compile/CompilerConfig'

export default {
  components: {
    SimpleGraphCode
  },
  props: {
    compilerConfig: Object
  },
  computed: {
    defaultCompilerConfig: function() {
      return CompilerConfig.getDefault()
    }
  }
}
</script>

<style lang="scss">
.help-jump-statement-tab {
    .graph-code-container {
        position: relative;
        svg.jump-link-layer {
            position: absolute;
            top: -3px;
            left: 0;
            width: 268px;
        }
    }
}
</style>
