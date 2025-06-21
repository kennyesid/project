module.exports = {
  'env':{
    'browser':true,
    'commonjs':true,
    'es2021':true
  },
  'extends':'eslint:recommended',
  'parserOptions':{
    'ecmaVersion':12
  },
  'globals':{
    'it':'false',
    'describe':'false',
    'process':'false'
  },
  'rules':{
    'indent':[
      'error',
      2
    ],
    'linebreak-style':[
      'error',
      'windows'
    ],
    'quotes':[
      'error',
      'single'
    ],
    'semi':[
      'error',
      'always'
    ],
    'no-multi-spaces':[
      'error'
    ],
    'curly':[
      'error',
      'all'
    ],
    'no-inline-comments':[
      'error'
    ],
    'prefer-destructuring':[
      'error',
      {
        'object':true,
        'array':false
      }
    ],
    'object-curly-spacing':[
      'error',
      'always'
    ],
    'comma-spacing':[
      'error',
      { 'before': false, 'after': true }
    ],
    'brace-style': ['error', '1tbs'],
    'space-in-parens': ['error', 'never'],
    'space-infix-ops': ['error', { 'int32Hint': true }],
    'arrow-spacing': ['error', { 'before': true, 'after': true }],
    'space-before-function-paren': ['error', 'never'],
    'keyword-spacing': ['error', { 'before': true }],
    'space-before-blocks': ['error', 'always']
  }
};