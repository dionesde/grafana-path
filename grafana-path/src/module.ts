import { PanelPlugin } from '@grafana/data';
import { SimpleOptions } from './types';
import { SimplePanel } from './SimplePanel';

export const plugin = new PanelPlugin<SimpleOptions>(SimplePanel).setPanelOptions(builder => {
  return builder
      .addNumberInput({
        path: 'lat',
        name: 'Latitude',
        //description: 'Description of panel option',
        defaultValue: -29.99105,
      })
      .addNumberInput({
        path: 'lng',
        name: 'Longitude',
        //description: 'Description of panel option',
        defaultValue: -53.718447,
      })
      .addNumberInput({
        path: 'zoom',
        name: 'Zoom',
        //description: 'Description of panel option',
        defaultValue: 7,
      })
      .addNumberInput({
          path: 'delay',
          name: 'Delay',
          //description: 'Description of panel option',
          defaultValue: 1000,
      })
    .addTextInput({
      path: 'text',
      name: 'Simple text option',
      description: 'Description of panel option',
      defaultValue: 'Default value of text input option',
    })
    .addBooleanSwitch({
      path: 'showSeriesCount',
      name: 'Show series counter',
      defaultValue: false,
    })
    .addRadio({
      path: 'seriesCountSize',
      defaultValue: 'sm',
      name: 'Series counter size',
      settings: {
        options: [
          {
            value: 'sm',
            label: 'Small',
          },
          {
            value: 'md',
            label: 'Medium',
          },
          {
            value: 'lg',
            label: 'Large',
          },
        ],
      },
      showIf: config => config.showSeriesCount,
    });
});
