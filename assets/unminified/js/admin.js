/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/js/admin/Components.js":
/*!************************************!*\
  !*** ./src/js/admin/Components.js ***!
  \************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "CustomIconsControl": () => (/* binding */ CustomIconsControl),
/* harmony export */   "PreviewButton": () => (/* binding */ PreviewButton)
/* harmony export */ });
/* harmony import */ var _babel_runtime_helpers_extends__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/extends */ "./node_modules/@babel/runtime/helpers/esm/extends.js");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _functions__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./functions */ "./src/js/admin/functions.js");


const {
  i18n: {
    __
  },
  components: {
    Dashicon,
    Button,
    ButtonGroup,
    Tooltip,
    Icon,
    TextControl,
    BaseControl,
    useBaseControlProps,
    __experimentalHStack: HStack
  },
  element: {
    useState,
    useEffect
  }
} = wp;

const DEFAULT_ICONS = [{
  viewBox: '0 0 16 16',
  paths: ['M1 8a7 7 0 1 0 14 0A7 7 0 0 0 1 8zm15 0A8 8 0 1 1 0 8a8 8 0 0 1 16 0zm-7.5 3.5a.5.5 0 0 1-1 0V5.707L5.354 7.854a.5.5 0 1 1-.708-.708l3-3a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1-.708.708L8.5 5.707V11.5z']
}, {
  viewBox: '0 0 16 16',
  paths: ['M15 2a1 1 0 0 0-1-1H2a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V2zM0 2a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V2zm8.5 9.5a.5.5 0 0 1-1 0V5.707L5.354 7.854a.5.5 0 1 1-.708-.708l3-3a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1-.708.708L8.5 5.707V11.5z']
}, {
  viewBox: '0 0 16 16',
  paths: ['M3.5 10a.5.5 0 0 1-.5-.5v-8a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 .5.5v8a.5.5 0 0 1-.5.5h-2a.5.5 0 0 0 0 1h2A1.5 1.5 0 0 0 14 9.5v-8A1.5 1.5 0 0 0 12.5 0h-9A1.5 1.5 0 0 0 2 1.5v8A1.5 1.5 0 0 0 3.5 11h2a.5.5 0 0 0 0-1h-2z', 'M7.646 4.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1-.708.708L8.5 5.707V14.5a.5.5 0 0 1-1 0V5.707L5.354 7.854a.5.5 0 1 1-.708-.708l3-3z']
}, {
  viewBox: '0 0 16 16',
  paths: ['M8 10a.5.5 0 0 0 .5-.5V3.707l2.146 2.147a.5.5 0 0 0 .708-.708l-3-3a.5.5 0 0 0-.708 0l-3 3a.5.5 0 1 0 .708.708L7.5 3.707V9.5a.5.5 0 0 0 .5.5zm-7 2.5a.5.5 0 0 1 .5-.5h13a.5.5 0 0 1 0 1h-13a.5.5 0 0 1-.5-.5z']
}, {
  viewBox: '0 0 16 16',
  paths: ['M8 12a.5.5 0 0 0 .5-.5V5.707l2.146 2.147a.5.5 0 0 0 .708-.708l-3-3a.5.5 0 0 0-.708 0l-3 3a.5.5 0 1 0 .708.708L7.5 5.707V11.5a.5.5 0 0 0 .5.5z']
}];
/**
 * Custom Icons 
 */

const CustomIconsControl = _ref => {
  let {
    formData,
    setFormData,
    ...restProps
  } = _ref;
  const {
    baseControlProps,
    controlProps
  } = useBaseControlProps(restProps);
  const {
    disabled
  } = baseControlProps;
  const {
    icon = {}
  } = formData || {};
  const [viewBox, setViewBox] = useState(icon?.viewBox);
  const [paths, setPaths] = useState(icon?.paths);

  const handleSelect = icon => {
    setPaths(icon.paths);
    setViewBox(icon.viewBox);
    setFormData({ ...formData,
      icon
    });
  };

  const addItem = () => {
    const updatedItems = [...paths, ''];
    setPaths(updatedItems);
    setFormData({ ...formData,
      icon: {
        viewBox,
        paths: updatedItems
      }
    });
  };

  const removeItem = index => {
    const updatedItems = [...paths];
    updatedItems.splice(index, 1);
    setPaths(updatedItems);
    setFormData({ ...formData,
      icon: {
        viewBox,
        paths: updatedItems
      }
    });
  };

  const updateItem = (index, value) => {
    const updatedItems = [...paths];
    updatedItems[index] = value;
    setPaths(updatedItems);
    setFormData({ ...formData,
      icon: {
        viewBox,
        paths: updatedItems
      }
    });
  };

  return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)(BaseControl, baseControlProps, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)("p", {
    style: {
      marginTop: 0
    }
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)(ButtonGroup, null, DEFAULT_ICONS.map(item => (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)(Button, {
    isPrimary: JSON.stringify(item) === JSON.stringify(icon),
    onClick: () => handleSelect(item)
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)(Icon, {
    icon: () => {
      return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)("svg", {
        xmlns: "http://www.w3.org/2000/svg",
        viewBox: item?.viewBox,
        height: 16
      }, item?.paths.map(el => (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)("path", {
        fill: "currentColor",
        d: el
      })));
    }
  }))))), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)("p", {
    style: {
      marginTop: 0
    }
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)(HStack, {
    style: {
      alignItems: 'stretch'
    }
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)(TextControl, (0,_babel_runtime_helpers_extends__WEBPACK_IMPORTED_MODULE_0__["default"])({}, controlProps, {
    disabled: disabled,
    className: "flex-grow-1",
    placeholder: __('ViewBox', 'wca-scrolltop'),
    value: viewBox,
    onChange: setViewBox
  })), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)(Button, {
    disabled: disabled,
    style: {
      height: 'initial'
    },
    isSecondary: true,
    isSmall: true,
    onClick: () => {
      setFormData({ ...formData,
        icon: { ...formData.icon,
          viewBox
        }
      });
    },
    showTooltip: true
  }, __('Update SVG viewBox', 'wca-scrolltop')))), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)("p", {
    style: {
      marginTop: 0
    }
  }, paths.map((item, index) => (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)("p", {
    style: {
      marginTop: 0
    }
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)(HStack, {
    key: index,
    style: {
      alignItems: 'stretch'
    }
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)(TextControl, (0,_babel_runtime_helpers_extends__WEBPACK_IMPORTED_MODULE_0__["default"])({}, controlProps, {
    disabled: disabled,
    className: "flex-grow-1",
    placeholder: __('Path', 'wca-scrolltop'),
    value: item,
    onChange: value => updateItem(index, value)
  })), index !== 0 && (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)(Button, {
    disabled: disabled,
    style: {
      height: 'initial'
    },
    isDestructive: true,
    isSmall: true,
    onClick: () => removeItem(index)
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)(Dashicon, {
    icon: "no"
  })))))), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)(Button, {
    disabled: disabled,
    isPrimary: true,
    onClick: addItem
  }, __('Add Path', 'wca-scrolltop')));
};
/**
 * Custom Icons 
 */


const PreviewButton = _ref2 => {
  let {
    formData
  } = _ref2;
  const {
    icon: {
      viewBox = '0 0 16 16',
      paths = ['M1 8a7 7 0 1 0 14 0A7 7 0 0 0 1 8zm15 0A8 8 0 1 1 0 8a8 8 0 0 1 16 0zm-7.5 3.5a.5.5 0 0 1-1 0V5.707L5.354 7.854a.5.5 0 1 1-.708-.708l3-3a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1-.708.708L8.5 5.707V11.5z']
    } = {},
    scroll: {
      offset = 0
    } = {},
    classes = ''
  } = formData;
  const [disabledButton, setDisabledButton] = useState(window.scrollY < offset);

  const generateStyles = function () {
    let {
      position,
      style: {
        padding,
        border = {},
        borderRadius,
        opacity,
        width,
        height,
        left = 'initial',
        right = 'initial',
        bottom = 0,
        backgroundColor = 'transparent',
        color = 'inherit'
      } = {}
    } = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    let style = {
      position: 'fixed',
      zIndex: disabledButton ? -1 : 5,
      bottom,
      width,
      height,
      padding,
      color,
      borderRadius,
      backgroundColor,
      opacity: disabledButton ? 0 : `${opacity}%`,
      left: position === 'left' ? left : 'initial',
      right: position === 'right' ? right : 'initial',
      transition: 'all .3s ease-in-out'
    };
    let borderStyles = {};
    const borderKeys = Object.keys(border);
    const sides = ['top', 'left', 'right', 'bottom'];
    const hasBorderMultiple = sides.some(side => borderKeys.includes(side));

    if (hasBorderMultiple) {
      for (const dir in border) {
        const dirStyles = border[dir];
        borderStyles = { ...borderStyles,
          [`border${(0,_functions__WEBPACK_IMPORTED_MODULE_2__.capitalizeWord)(dir)}`]: Object.values(dirStyles).join(' ')
        };
      }
    } else {
      borderStyles = {
        border: Object.values(border).join(' ')
      };
    }

    style = { ...style,
      ...borderStyles
    };
    return style;
  };

  useEffect(() => {
    const handleScroll = () => {
      const currentPosition = window.scrollY;
      setDisabledButton(currentPosition < offset);
    }; // To disable button on offset change.


    handleScroll(); // To disable button on scroll.

    window.addEventListener('scroll', handleScroll); // Cleanup

    return () => window.removeEventListener('scroll', handleScroll);
  }, [offset]);
  return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)(Tooltip, {
    text: __('Preview', 'wca-scrolltop')
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)(Button, {
    className: classes,
    style: generateStyles(formData)
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)(Icon, {
    icon: () => {
      return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)("svg", {
        xmlns: "http://www.w3.org/2000/svg",
        viewBox: viewBox
      }, paths.map(el => {
        return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)("path", {
          fill: "currentColor",
          d: el
        });
      }));
    }
  })));
};



/***/ }),

/***/ "./src/js/admin/functions.js":
/*!***********************************!*\
  !*** ./src/js/admin/functions.js ***!
  \***********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "capitalizeWord": () => (/* binding */ capitalizeWord)
/* harmony export */ });
/**
 * Capitalize Word
 * 
 * @param {string} word
 */
const capitalizeWord = word => `${word.charAt(0).toUpperCase()}${word.slice(1)}`;



/***/ }),

/***/ "@wordpress/element":
/*!*********************************!*\
  !*** external ["wp","element"] ***!
  \*********************************/
/***/ ((module) => {

module.exports = window["wp"]["element"];

/***/ }),

/***/ "./node_modules/@babel/runtime/helpers/esm/extends.js":
/*!************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/esm/extends.js ***!
  \************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ _extends)
/* harmony export */ });
function _extends() {
  _extends = Object.assign ? Object.assign.bind() : function (target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];

      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }

    return target;
  };
  return _extends.apply(this, arguments);
}

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!*************************!*\
  !*** ./src/js/admin.js ***!
  \*************************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _admin_Components__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./admin/Components */ "./src/js/admin/Components.js");


/**
 * @package: 	WeCodeArt CF7 Extension
 * @author: 	Bican Marian Valeriu
 * @license:	https://www.wecodeart.com/
 * @version:	1.0.0
 */
const {
  i18n: {
    __
  },
  hooks: {
    addFilter
  },
  components: {
    Placeholder,
    Card,
    CardHeader,
    CardBody,
    Spinner,
    Button,
    TextControl,
    BaseControl,
    ColorPicker,
    RangeControl,
    DropdownMenu,
    SelectControl,
    // ToggleControl,
    ColorIndicator,
    __experimentalHStack: HStack,
    __experimentalNumberControl: NumberControl,
    __experimentalBorderBoxControl: BorderBoxControl
  },
  element: {
    useState
  }
} = wp;

addFilter('wecodeart.admin.tabs.plugins', 'wecodeart/scrolltop/admin/panel', optionsPanel);

function optionsPanel(panels) {
  return [...panels, {
    name: 'wca-scrolltop',
    title: __('Scroll Top', 'wca-scrolltop'),
    render: props => (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(Options, props)
  }];
}

const Options = props => {
  const {
    settings,
    saveSettings,
    isRequesting,
    createNotice
  } = props;

  if (isRequesting || !settings) {
    return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(Placeholder, {
      icon: (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(Spinner, null),
      label: __('Loading', 'wca-scrolltop'),
      instructions: __('Please wait, loading settings...', 'wca-scrolltop')
    });
  }

  const apiOptions = (_ref => {
    let {
      scrolltop
    } = _ref;
    return scrolltop;
  })(settings);

  const [loading, setLoading] = useState(null);
  const [formData, setFormData] = useState(apiOptions);

  const setStyle = function () {
    let extra = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    const newStyle = { ...formData?.style,
      ...extra
    };
    setFormData({ ...formData,
      style: newStyle
    });
  };

  const handleNotice = () => {
    setLoading(false);
    return createNotice('success', __('Settings saved.', 'wca-scrolltop'));
  };

  return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "grid",
    style: {
      '--wca--columns': 2
    }
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "g-col-1"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(Card, {
    className: "border shadow-none"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(CardHeader, null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("h5", {
    className: "text-uppercase fw-medium m-0"
  }, __('Design', 'wca-scrolltop'))), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(CardBody, {
    style: {
      color: 'rgb(30, 30, 30)'
    }
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("p", null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_admin_Components__WEBPACK_IMPORTED_MODULE_1__.CustomIconsControl, {
    formData,
    setFormData,
    label: __('Icon', 'wca-scrolltop'),
    help: __('Use simple icons like FontAwesome or Bootstrap. Each icon can have 1 or more path elements.', 'wca-scrolltop')
  })), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("p", null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(SelectControl, {
    label: __('Position', 'wca-scrolltop'),
    value: formData?.position,
    options: [{
      label: __('Left', 'wca-scrolltop'),
      value: 'left'
    }, {
      label: __('Right', 'wca-scrolltop'),
      value: 'right'
    }],
    onChange: position => setFormData({ ...formData,
      position
    }),
    __nextHasNoMarginBottom: true
  })), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("p", null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(HStack, null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(NumberControl, {
    isShiftStepEnabled: true,
    spinControls: "custom",
    label: __('Horizontal Margin', 'wca-scrolltop'),
    help: __('Number of pixels for horizontal window distance.', 'wca-scrolltop'),
    min: 0,
    value: formData?.style?.[formData?.position],
    onChange: value => setStyle({
      [formData?.position]: parseInt(value)
    })
  }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(NumberControl, {
    isShiftStepEnabled: true,
    spinControls: "custom",
    label: __('Vertical Margin', 'wca-scrolltop'),
    help: __('Number of pixels for vertical window distance.', 'wca-scrolltop'),
    min: 0,
    value: formData?.style?.bottom,
    onChange: bottom => setStyle({
      bottom: parseInt(bottom)
    })
  }))), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("p", null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(NumberControl, {
    isShiftStepEnabled: true,
    spinControls: "custom",
    label: __('Size', 'wca-scrolltop'),
    min: 20,
    value: formData?.style?.width,
    onChange: size => setStyle({
      width: parseInt(size),
      height: parseInt(size)
    }),
    help: __('In pixels.', 'wca-scrolltop')
  })), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("p", null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(NumberControl, {
    isShiftStepEnabled: true,
    spinControls: "custom",
    label: __('Padding', 'wca-scrolltop'),
    min: 0,
    value: formData?.style?.padding,
    onChange: padding => setStyle({
      padding: parseInt(padding)
    }),
    help: __('In pixels.', 'wca-scrolltop')
  })), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("p", null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(RangeControl, {
    label: __('Opacity', 'wca-scrolltop'),
    value: formData?.style?.opacity,
    onChange: opacity => setStyle({
      opacity: parseInt(opacity)
    }),
    min: 0,
    step: 5,
    max: 100
  })), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("p", null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(BaseControl, {
    label: __('Colors', 'wca-scrolltop')
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(HStack, {
    style: {
      justifyContent: 'flex-start'
    }
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(DropdownMenu, {
    label: __('Background Color', 'wca-scrolltop'),
    icon: (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(ColorIndicator, {
      colorValue: formData?.style?.backgroundColor
    }),
    toggleProps: {
      style: {
        height: 'initial',
        minWidth: 'initial',
        padding: 0
      }
    },
    popoverProps: {
      focusOnMount: 'container',
      position: 'bottom',
      noArrow: false
    }
  }, () => (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(ColorPicker, {
    color: formData?.style?.backgroundColor,
    onChange: backgroundColor => setStyle({
      backgroundColor
    }),
    enableAlpha: true,
    defaultValue: "#000"
  })), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(DropdownMenu, {
    label: __('Icon Color', 'wca-scrolltop'),
    icon: (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(ColorIndicator, {
      colorValue: formData?.style?.color
    }),
    toggleProps: {
      style: {
        height: 'initial',
        minWidth: 'initial',
        padding: 0
      }
    },
    popoverProps: {
      focusOnMount: 'container',
      position: 'bottom',
      noArrow: false
    }
  }, () => (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(ColorPicker, {
    color: formData?.style?.color,
    onChange: color => setStyle({
      color
    }),
    enableAlpha: true,
    defaultValue: "#000"
  }))))), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("p", null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(BorderBoxControl, {
    label: __('Border', 'wca-scrolltop'),
    value: formData?.style?.border,
    onChange: border => setStyle({
      border
    })
  })), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("p", null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(RangeControl, {
    label: __('Radius', 'wca-scrolltop'),
    allowReset: true,
    value: formData?.style?.borderRadius,
    onChange: borderRadius => setStyle({
      borderRadius
    }),
    min: 0
  }))))), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "g-col-1"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(Card, {
    className: "border shadow-none position-sticky sticky-top h-100"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(CardHeader, null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("h5", {
    className: "text-uppercase fw-medium m-0"
  }, __('Functionality', 'wca-scrolltop'))), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(CardBody, {
    style: {
      color: 'rgb(30, 30, 30)'
    }
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("p", null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(SelectControl, {
    label: __('Action', 'wca-scrolltop'),
    value: formData?.action,
    options: [{
      label: 'Scroll to Top',
      value: 'top'
    }, {
      label: 'Scroll to Element',
      value: 'element'
    }],
    onChange: action => {
      if (action === 'top') {
        delete formData.element;
      }

      setFormData({ ...formData,
        action
      });
    }
  })), formData?.action === 'element' && (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("p", null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(TextControl, {
    label: __('Element selector', 'wca-scrolltop'),
    value: formData?.element?.selector,
    onChange: selector => setFormData({ ...formData,
      element: { ...formData.element,
        selector
      }
    }),
    help: __('CSS selector of the element, you are trying to scroll to. Eg: #myDivID, .myDivClass', 'wca-scrolltop')
  })), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("p", null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(NumberControl, {
    isShiftStepEnabled: true,
    spinControls: "custom",
    label: __('Element offset', 'wca-scrolltop'),
    value: formData?.element?.offset,
    onChange: offset => setFormData({ ...formData,
      element: { ...formData.element,
        offset: parseInt(offset)
      }
    }),
    help: __('Negative value allowed. Use this to precisely set scroll position when you have overlapping elements.', 'wca-scrolltop')
  }))), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("p", null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(NumberControl, {
    isShiftStepEnabled: true,
    spinControls: "custom",
    label: __('Scroll offset', 'wca-scrolltop'),
    help: __('Number of pixels to be scrolled before the button appears.', 'wca-scrolltop'),
    min: 0,
    value: formData?.scroll?.offset,
    onChange: offset => setFormData({ ...formData,
      scroll: { ...formData?.scroll,
        offset: parseInt(offset)
      }
    })
  })), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("p", null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(NumberControl, {
    isShiftStepEnabled: true,
    spinControls: "custom",
    label: __('Scroll duration', 'wca-scrolltop'),
    help: __('Window scroll duration in milliseconds when the button is pressed.', 'wca-scrolltop'),
    min: 100,
    step: 10,
    value: formData?.scroll?.duration,
    onChange: duration => setFormData({ ...formData,
      scroll: { ...formData?.scroll,
        duration: parseInt(duration)
      }
    })
  })), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("p", null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(TextControl, {
    label: __('Class(es)', 'wca-scrolltop'),
    value: formData?.classes,
    onChange: classes => setFormData({ ...formData,
      classes
    }),
    help: __('You can use utilities like: d-none, d-md-block; and so on.', 'wca-scrolltop')
  })))))), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_admin_Components__WEBPACK_IMPORTED_MODULE_1__.PreviewButton, {
    formData
  }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("hr", {
    style: {
      margin: '20px 0'
    }
  }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(Button, {
    className: "button",
    isPrimary: true,
    isLarge: true,
    icon: loading && (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(Spinner, null),
    onClick: () => {
      setLoading(true);
      saveSettings({
        scrolltop: formData
      }, handleNotice);
    },
    disabled: loading
  }, loading ? '' : __('Save', 'wecodeart')));
};
})();

/******/ })()
;
//# sourceMappingURL=admin.js.map