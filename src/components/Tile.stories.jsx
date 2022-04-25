import React from 'react';
import Tile from './Tile';

export default {
    title: 'atoms/Tile',
    component: Tile,
    argTypes: {
        rowIndex: {
            control: 'number',
        },
        tileIndex: {
            control: 'number',
        },
        tile: {
            control: 'text',
        },
    },
};

const Template = (args) => <Tile {...args} />;

export const TileDefault = Template.bind({});
TileDefault.args = {
    rowIndex: 1,
    tileIndex: 5,
    tile: 'T',
};
