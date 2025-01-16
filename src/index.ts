/**
 * JupyterLab extension plugin that registers "bosque" with the editor language registry
 * and associates .bsq files with "text/x-bosque".
 */
import {
  JupyterFrontEnd,
  JupyterFrontEndPlugin
} from '@jupyterlab/application';
import { IEditorLanguageRegistry } from '@jupyterlab/codemirror';
import { bosqueLanguageSupport } from './bosque-language-support';

const BOSQUE_PLUGIN_ID = 'jupyterlab-bosque-syntax:plugin';

const extension: JupyterFrontEndPlugin<void> = {
  id: BOSQUE_PLUGIN_ID,
  description:
    'Bosque syntax highlighting with distinct colors for each keyword group.',
  autoStart: true,
  requires: [IEditorLanguageRegistry],
  activate: (
    app: JupyterFrontEnd,
    languageRegistry: IEditorLanguageRegistry
  ) => {
    try {
      // Register language
      languageRegistry.addLanguage({
        name: 'bosque',
        displayName: 'Bosque',
        mime: 'text/x-bosque',
        extensions: ['.bsq'],
        load: async () => bosqueLanguageSupport
      });
    } catch (error) {
      console.error('Failed to register Bosque language:', error);
    }

    try {
      // Register .bsq file type
      app.docRegistry.addFileType({
        name: 'bosque',
        displayName: 'Bosque',
        mimeTypes: ['text/x-bosque'],
        extensions: ['.bsq'],
        fileFormat: 'text',
        contentType: 'code'
      });
    } catch (error) {
      console.error('Failed to register Bosque (.bsq) file type:', error);
    }
    console.log('JupyterLab extension jupyterlab_bosque_syntax is activated!');
  },

  deactivate: async () => {
    console.log('Bosque syntax extension is deactivated!');
  }
};

export default extension;
