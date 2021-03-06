'use strict';

pbc.globalFunctionD['type'] = function (py2block, func, args, keywords, starargs, kwargs, node) {
    if (args.length != 1) {
        throw new Error("Incorrect number of arguments");
    }
    return block("base_type", func.lineno, {}, {
            'DATA': py2block.convert(args[0]),
        }, {
            "inline": "true"
        });
}


function typeName() {
    function converter(py2block, node, id, ctx, nodeName) {
        return block("controls_TypeLists", node.lineno, {'type': nodeName}, {}, {
            "inline": "true"
        });
    }

    return converter;
}

pbc.reservedNameD['int'] = typeName();
pbc.reservedNameD['float'] = typeName();
pbc.reservedNameD['str'] = typeName();
pbc.reservedNameD['list'] = typeName();
pbc.reservedNameD['tuple'] = typeName();
pbc.reservedNameD['dict'] = typeName();
pbc.reservedNameD['set'] = typeName();
pbc.reservedNameD['NoneType'] = typeName();

pbc.globalFunctionD['range'] = function (py2block, func, args, keywords, starargs, kwargs, node) {
    if (args.length !== 3) {
        throw new Error("Incorrect number of arguments");
    }
    var arg1block = py2block.convert(args[0]);
    var arg2block = py2block.convert(args[1]);
    var arg3block = py2block.convert(args[2]);
    return block("controls_range", func.lineno, {
    }, {
        'FROM': arg1block,
        'TO': arg2block,
        'STEP': arg3block
    }, {
        "inline": "true"
    });
}

//for i in ...在python_to_blockly.js中实现
