import { JSXNode, render } from '@builder.io/qwik';
import { QwikCityMockProvider } from '@builder.io/qwik-city';
import { jsx as _jsx } from '@builder.io/qwik/jsx-runtime';
import { QWIK_LOADER } from '@builder.io/qwik/loader/index';

eval(QWIK_LOADER);

export const decorators = [
  (Story: () => JSXNode) => {
    const parent = document.createElement('div');
    const jsxNode = Story();
    const tree = _jsx(
      QwikCityMockProvider,
      {
        children: jsxNode,
      },
      'QwikCityMockProvider'
    );
    render(parent, tree);
    return parent;
  },
];
