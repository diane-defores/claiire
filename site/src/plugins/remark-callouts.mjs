import { visit } from 'unist-util-visit';

const DEFAULT_TITLES = {
  note: 'Note',
  tip: 'Astuce',
  caution: 'Attention',
  warning: 'Attention',
  danger: 'Important',
};

/**
 * Transforme les directives de type :::tip[...] en blocs HTML stylables.
 */
export default function remarkCallouts() {
  return (tree) => {
    visit(tree, (node) => {
      if (node.type !== 'containerDirective') {
        return;
      }

      if (!(node.name in DEFAULT_TITLES)) {
        return;
      }

      const title = node.label || DEFAULT_TITLES[node.name];

      node.data = {
        hName: 'aside',
        hProperties: {
          className: ['callout', `callout--${node.name}`],
        },
      };

      if (title) {
        node.children.unshift({
          type: 'paragraph',
          data: {
            hName: 'p',
            hProperties: {
              className: ['callout__title'],
            },
          },
          children: [{ type: 'text', value: title }],
        });
      }
    });
  };
}
