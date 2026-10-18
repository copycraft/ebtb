/* @ds-bundle: {"format":4,"namespace":"EBTBDesignSystem_c7b8b1","components":[{"name":"CartLine","sourcePath":"components/commerce/CartLine.jsx"},{"name":"PriceTag","sourcePath":"components/commerce/PriceTag.jsx"},{"name":"ProductCard","sourcePath":"components/commerce/ProductCard.jsx"},{"name":"SpecStrip","sourcePath":"components/commerce/SpecStrip.jsx"},{"name":"Badge","sourcePath":"components/core/Badge.jsx"},{"name":"Button","sourcePath":"components/core/Button.jsx"},{"name":"Card","sourcePath":"components/core/Card.jsx"},{"name":"Icon","sourcePath":"components/core/Icon.jsx"},{"name":"IconButton","sourcePath":"components/core/IconButton.jsx"},{"name":"Marquee","sourcePath":"components/core/Marquee.jsx"},{"name":"Photo","sourcePath":"components/core/Photo.jsx"},{"name":"SectionHeading","sourcePath":"components/core/SectionHeading.jsx"},{"name":"Tag","sourcePath":"components/core/Tag.jsx"},{"name":"Dialog","sourcePath":"components/feedback/Dialog.jsx"},{"name":"Toast","sourcePath":"components/feedback/Toast.jsx"},{"name":"Tooltip","sourcePath":"components/feedback/Tooltip.jsx"},{"name":"Checkbox","sourcePath":"components/forms/Checkbox.jsx"},{"name":"Input","sourcePath":"components/forms/Input.jsx"},{"name":"QuantityStepper","sourcePath":"components/forms/QuantityStepper.jsx"},{"name":"Radio","sourcePath":"components/forms/Radio.jsx"},{"name":"Select","sourcePath":"components/forms/Select.jsx"},{"name":"Switch","sourcePath":"components/forms/Switch.jsx"},{"name":"Footer","sourcePath":"components/navigation/Footer.jsx"},{"name":"NavBar","sourcePath":"components/navigation/NavBar.jsx"},{"name":"Tabs","sourcePath":"components/navigation/Tabs.jsx"}],"sourceHashes":{"components/commerce/CartLine.jsx":"e06d209f03d1","components/commerce/PriceTag.jsx":"8a4c6c188b4f","components/commerce/ProductCard.jsx":"9e91e673815a","components/commerce/SpecStrip.jsx":"02b61275dc62","components/core/Badge.jsx":"d41ebaa1f4c0","components/core/Button.jsx":"c7896e5a7813","components/core/Card.jsx":"df9d23aae25b","components/core/Icon.jsx":"9dca15f57053","components/core/IconButton.jsx":"d0ee4b12d635","components/core/Marquee.jsx":"2ceee6ae8c1e","components/core/Photo.jsx":"008479a14838","components/core/SectionHeading.jsx":"2793df41a8cc","components/core/Tag.jsx":"93a816c10e81","components/feedback/Dialog.jsx":"9224b916da21","components/feedback/Toast.jsx":"b98f0c10449c","components/feedback/Tooltip.jsx":"8d7b74ce51c9","components/forms/Checkbox.jsx":"154c38f5cbfd","components/forms/Input.jsx":"53d8d87dac8e","components/forms/QuantityStepper.jsx":"d607ec1e784f","components/forms/Radio.jsx":"6010cb7f8061","components/forms/Select.jsx":"0c0733255ac7","components/forms/Switch.jsx":"b94f4a807b0a","components/navigation/Footer.jsx":"39067f39df4b","components/navigation/NavBar.jsx":"6639b876908d","components/navigation/Tabs.jsx":"d59c7ab688fc","ui_kits/spice-club/Account.jsx":"20ebae1ec65e","ui_kits/spice-club/Blends.jsx":"7f57ea00e6ff","ui_kits/spice-club/Deliveries.jsx":"194c3a9475c1","ui_kits/storefront/CartDrawer.jsx":"608afafcd370","ui_kits/storefront/Collection.jsx":"19ebe247476b","ui_kits/storefront/Home.jsx":"735484c54a5d","ui_kits/storefront/Product.jsx":"78d4baf55533"},"inlinedExternals":[],"unexposedExports":[]} */

(() => {

const __ds_ns = (window.EBTBDesignSystem_c7b8b1 = window.EBTBDesignSystem_c7b8b1 || {});

const __ds_scope = {};

(__ds_ns.__errors = __ds_ns.__errors || []);

// components/commerce/PriceTag.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/** Price display with optional struck compare-at price. */
function PriceTag({
  price,
  compareAt,
  size = "md",
  style,
  ...rest
}) {
  const sizes = {
    sm: "var(--type-body-md)",
    md: "var(--type-headline-sm)",
    lg: "var(--type-headline-md)"
  };
  return /*#__PURE__*/React.createElement("span", _extends({
    style: {
      display: "inline-flex",
      alignItems: "baseline",
      gap: "var(--space-2)",
      fontFamily: "var(--font-mono)",
      fontWeight: 500,
      fontSize: sizes[size],
      ...style
    }
  }, rest), price, compareAt ? /*#__PURE__*/React.createElement("span", {
    style: {
      textDecoration: "line-through",
      color: "var(--text-muted)",
      fontSize: "var(--type-body-sm)"
    }
  }, compareAt) : null);
}
Object.assign(__ds_scope, { PriceTag });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/commerce/PriceTag.jsx", error: String((e && e.message) || e) }); }

// components/commerce/SpecStrip.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/** Mono data row: the brand's way of stating facts (weight, heat, ingredients). */
function SpecStrip({
  items = [],
  align = "center",
  style,
  ...rest
}) {
  return /*#__PURE__*/React.createElement("div", _extends({
    style: {
      display: "flex",
      gap: "var(--space-4)",
      alignItems: "center",
      flexWrap: "wrap",
      justifyContent: align === "center" ? "center" : "flex-start",
      fontFamily: "var(--font-mono)",
      fontSize: "var(--type-label-md)",
      color: "var(--poppy-700)",
      borderTop: "var(--border-1) solid var(--border-soft)",
      borderBottom: "var(--border-1) solid var(--border-soft)",
      padding: "10px 0",
      ...style
    }
  }, rest), items.map((it, i) => /*#__PURE__*/React.createElement(React.Fragment, {
    key: i
  }, i > 0 ? /*#__PURE__*/React.createElement("span", {
    style: {
      opacity: .5
    }
  }, "\u2014") : null, /*#__PURE__*/React.createElement("span", null, typeof it === "string" ? it : it.label + " " + it.value))));
}
Object.assign(__ds_scope, { SpecStrip });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/commerce/SpecStrip.jsx", error: String((e && e.message) || e) }); }

// components/core/Badge.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const TONES = {
  blaze: {
    background: "var(--surface-blaze)",
    color: "var(--text-on-blaze)"
  },
  garlic: {
    background: "var(--surface-garlic)",
    color: "var(--poppy-800)"
  },
  onion: {
    background: "var(--surface-onion)",
    color: "var(--salt-100)"
  },
  scallion: {
    background: "var(--surface-scallion)",
    color: "var(--poppy-800)"
  },
  paper: {
    background: "var(--surface-card)",
    color: "var(--poppy-800)"
  },
  ink: {
    background: "var(--surface-ink)",
    color: "var(--text-on-ink)"
  }
};

/** Sticker badge: pill claim label that sits on cards, packs and hero art. */
function Badge({
  tone = "garlic",
  rotate = 0,
  size = "md",
  children,
  style,
  ...rest
}) {
  return /*#__PURE__*/React.createElement("span", _extends({
    style: {
      display: "inline-flex",
      alignItems: "center",
      gap: "6px",
      fontFamily: "var(--font-ui)",
      fontWeight: "var(--weight-black)",
      textTransform: "uppercase",
      fontSize: size === "sm" ? "var(--type-label-sm)" : "var(--type-label-md)",
      letterSpacing: "var(--tracking-label)",
      padding: size === "sm" ? "5px 12px" : "7px 16px",
      borderRadius: "var(--radius-pill)",
      border: "var(--border-2) solid var(--border-strong)",
      boxShadow: "var(--shadow-sticker-sm)",
      transform: rotate ? "rotate(" + rotate + "deg)" : "none",
      whiteSpace: "nowrap",
      ...TONES[tone],
      ...style
    }
  }, rest), children);
}
Object.assign(__ds_scope, { Badge });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Badge.jsx", error: String((e && e.message) || e) }); }

// components/core/Button.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const FILLS = {
  primary: {
    background: "var(--action-primary)",
    color: "var(--text-on-blaze)"
  },
  ink: {
    background: "var(--surface-ink)",
    color: "var(--text-on-ink)"
  },
  garlic: {
    background: "var(--surface-garlic)",
    color: "var(--poppy-800)"
  },
  outline: {
    background: "var(--surface-card)",
    color: "var(--poppy-800)"
  },
  ghost: {
    background: "transparent",
    color: "var(--poppy-800)",
    boxShadow: "none",
    border: "var(--border-2) solid transparent",
    textDecoration: "underline",
    textDecorationThickness: "2px",
    textUnderlineOffset: "3px"
  }
};
const SIZES = {
  sm: {
    padding: "8px 18px",
    fontSize: "var(--type-label-sm)"
  },
  md: {
    padding: "13px 28px",
    fontSize: "var(--type-label-md)"
  },
  lg: {
    padding: "18px 40px",
    fontSize: "15px"
  }
};

/** Pill action button. Hard sticker shadow, shifts into the shadow on press. */
function Button({
  variant = "primary",
  size = "md",
  fullWidth = false,
  disabled = false,
  as = "button",
  href,
  children,
  onClick,
  style,
  ...rest
}) {
  const [down, setDown] = React.useState(false);
  const [hover, setHover] = React.useState(false);
  const fill = FILLS[variant] || FILLS.primary;
  const ghost = variant === "ghost";
  const base = {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "var(--space-2)",
    fontFamily: "var(--font-ui)",
    fontWeight: "var(--weight-bold)",
    textTransform: "uppercase",
    letterSpacing: "var(--tracking-label)",
    lineHeight: 1,
    cursor: disabled ? "not-allowed" : "pointer",
    border: "var(--border-2) solid var(--border-strong)",
    borderRadius: "var(--radius-pill)",
    boxShadow: down ? "var(--shadow-pressed)" : "var(--shadow-sticker)",
    transform: down ? "translate(var(--press-shift),var(--press-shift))" : "none",
    transition: "transform var(--dur-fast) var(--ease-snap),box-shadow var(--dur-fast) var(--ease-snap),background var(--dur-fast) var(--ease-snap)",
    width: fullWidth ? "100%" : "auto",
    opacity: disabled ? 0.4 : 1,
    textDecoration: "none",
    filter: hover && !disabled && !ghost ? "brightness(0.94)" : "none",
    ...SIZES[size],
    ...fill,
    ...(ghost ? {
      boxShadow: "none",
      transform: "none",
      background: hover ? "var(--sesame-300)" : "transparent"
    } : null),
    ...style
  };
  const Tag = as === "a" ? "a" : "button";
  return /*#__PURE__*/React.createElement(Tag, _extends({
    href: href,
    style: base,
    disabled: Tag === "button" ? disabled : undefined,
    onMouseEnter: () => setHover(true),
    onMouseLeave: () => {
      setHover(false);
      setDown(false);
    },
    onMouseDown: () => !disabled && setDown(true),
    onMouseUp: () => setDown(false),
    onClick: disabled ? undefined : onClick
  }, rest), children);
}
Object.assign(__ds_scope, { Button });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Button.jsx", error: String((e && e.message) || e) }); }

// components/core/Card.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const TONES = {
  paper: {
    background: "var(--surface-card)"
  },
  cream: {
    background: "var(--sesame-300)"
  },
  blaze: {
    background: "var(--surface-blaze)",
    color: "var(--text-on-blaze)"
  },
  garlic: {
    background: "var(--surface-garlic)"
  },
  onion: {
    background: "var(--surface-onion)",
    color: "var(--salt-100)"
  },
  ink: {
    background: "var(--surface-ink)",
    color: "var(--text-on-ink)"
  },
  scallion: {
    background: "var(--surface-scallion)"
  }
};

/** The container. 20px radius, 2px ink outline, optional hard shadow. */
function Card({
  tone = "paper",
  shadow = true,
  padding = "var(--space-5)",
  lift = false,
  children,
  style,
  ...rest
}) {
  const [hover, setHover] = React.useState(false);
  return /*#__PURE__*/React.createElement("div", _extends({
    onMouseEnter: () => setHover(true),
    onMouseLeave: () => setHover(false),
    style: {
      borderRadius: "var(--radius-lg)",
      border: "var(--border-2) solid var(--border-strong)",
      boxShadow: shadow ? lift && hover ? "var(--shadow-sticker-lg)" : "var(--shadow-sticker)" : "none",
      transform: lift && hover ? "translate(-3px,-3px)" : "none",
      transition: "transform var(--dur-med) var(--ease-snap),box-shadow var(--dur-med) var(--ease-snap)",
      padding,
      overflow: "hidden",
      ...TONES[tone],
      ...style
    }
  }, rest), children);
}
Object.assign(__ds_scope, { Card });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Card.jsx", error: String((e && e.message) || e) }); }

// components/core/Icon.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const CDN = "https://unpkg.com/lucide-static@0.441.0/icons/";

/** Monochrome Lucide glyph, tinted with currentColor via CSS mask. */
function Icon({
  name,
  size = 20,
  strokeColor,
  style,
  ...rest
}) {
  const url = "url(" + CDN + name + ".svg)";
  return /*#__PURE__*/React.createElement("span", _extends({
    "aria-hidden": "true",
    style: {
      display: "inline-block",
      width: size,
      height: size,
      flex: "0 0 auto",
      background: strokeColor || "currentColor",
      WebkitMaskImage: url,
      maskImage: url,
      WebkitMaskRepeat: "no-repeat",
      maskRepeat: "no-repeat",
      WebkitMaskPosition: "center",
      maskPosition: "center",
      WebkitMaskSize: "contain",
      maskSize: "contain",
      ...style
    }
  }, rest));
}
Object.assign(__ds_scope, { Icon });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Icon.jsx", error: String((e && e.message) || e) }); }

// components/core/IconButton.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const SIZES = {
  sm: 32,
  md: 44,
  lg: 52
};

/** Circular icon-only control. Min 44px in product surfaces (touch target). */
function IconButton({
  name,
  label,
  variant = "outline",
  size = "md",
  onClick,
  style,
  ...rest
}) {
  const [down, setDown] = React.useState(false);
  const px = SIZES[size] || SIZES.md;
  const fills = {
    outline: {
      background: "var(--surface-card)",
      color: "var(--poppy-800)"
    },
    primary: {
      background: "var(--action-primary)",
      color: "var(--text-on-blaze)"
    },
    ink: {
      background: "var(--surface-ink)",
      color: "var(--text-on-ink)"
    },
    bare: {
      background: "transparent",
      color: "var(--poppy-800)",
      border: "var(--border-2) solid transparent",
      boxShadow: "none"
    }
  };
  return /*#__PURE__*/React.createElement("button", _extends({
    "aria-label": label,
    onClick: onClick,
    onMouseDown: () => setDown(true),
    onMouseUp: () => setDown(false),
    onMouseLeave: () => setDown(false),
    style: {
      width: px,
      height: px,
      display: "inline-flex",
      alignItems: "center",
      justifyContent: "center",
      border: "var(--border-2) solid var(--border-strong)",
      borderRadius: "var(--radius-pill)",
      cursor: "pointer",
      boxShadow: down ? "var(--shadow-pressed)" : "var(--shadow-sticker-sm)",
      transform: down ? "translate(1px,1px)" : "none",
      transition: "transform var(--dur-fast) var(--ease-snap),box-shadow var(--dur-fast) var(--ease-snap)",
      ...fills[variant],
      ...style
    }
  }, rest), /*#__PURE__*/React.createElement(__ds_scope.Icon, {
    name: name,
    size: size === "sm" ? 15 : 19
  }));
}
Object.assign(__ds_scope, { IconButton });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/IconButton.jsx", error: String((e && e.message) || e) }); }

// components/core/Marquee.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/** Endless scrolling claim bar — the brand's signature horizontal rule. */
function Marquee({
  items = [],
  tone = "onion",
  separator = "✳",
  speed = 26,
  style,
  ...rest
}) {
  const tones = {
    onion: {
      background: "var(--surface-onion)",
      color: "var(--salt-100)"
    },
    blaze: {
      background: "var(--surface-blaze)",
      color: "var(--text-on-blaze)"
    },
    garlic: {
      background: "var(--surface-garlic)",
      color: "var(--poppy-800)"
    },
    ink: {
      background: "var(--surface-ink)",
      color: "var(--text-on-ink)"
    },
    scallion: {
      background: "var(--surface-scallion)",
      color: "var(--poppy-800)"
    }
  };
  const run = items.concat(items, items);
  const id = React.useId().replace(/[:]/g, "");
  return /*#__PURE__*/React.createElement("div", _extends({
    style: {
      overflow: "hidden",
      borderTop: "var(--border-2) solid var(--border-strong)",
      borderBottom: "var(--border-2) solid var(--border-strong)",
      padding: "11px 0",
      ...tones[tone],
      ...style
    }
  }, rest), /*#__PURE__*/React.createElement("style", null, "@keyframes ebtb-marq-" + id + "{from{transform:translateX(0)}to{transform:translateX(-33.333%)}}"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: "var(--space-5)",
      width: "max-content",
      whiteSpace: "nowrap",
      animation: "ebtb-marq-" + id + " " + speed + "s linear infinite"
    }
  }, run.map((t, i) => /*#__PURE__*/React.createElement("span", {
    key: i,
    style: {
      display: "inline-flex",
      gap: "var(--space-5)",
      alignItems: "center",
      fontFamily: "var(--font-ui)",
      fontWeight: "var(--weight-black)",
      textTransform: "uppercase",
      fontSize: "var(--type-label-md)",
      letterSpacing: "var(--tracking-label-wide)"
    }
  }, t, /*#__PURE__*/React.createElement("span", {
    style: {
      opacity: .7
    }
  }, separator)))));
}
Object.assign(__ds_scope, { Marquee });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Marquee.jsx", error: String((e && e.message) || e) }); }

// components/core/Photo.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/** Image frame in the brand's crop shapes. Renders a labelled placeholder when src is absent. */
function Photo({
  src,
  alt = "",
  shape = "rounded",
  tone = "cream",
  ratio = "4 / 3",
  label = "PHOTO",
  style,
  ...rest
}) {
  const shapes = {
    rounded: {
      borderRadius: "var(--radius-lg)"
    },
    arch: {
      borderRadius: "var(--radius-arch)"
    },
    circle: {
      borderRadius: "var(--radius-pill)"
    },
    square: {
      borderRadius: 0
    }
  };
  const frame = {
    position: "relative",
    aspectRatio: ratio,
    overflow: "hidden",
    background: tone === "cream" ? "var(--sesame-300)" : tone === "blaze" ? "var(--blaze-100)" : "var(--poppy-100)",
    border: "var(--border-2) solid var(--border-strong)",
    ...shapes[shape],
    ...style
  };
  if (src) return /*#__PURE__*/React.createElement("div", _extends({
    style: frame
  }, rest), /*#__PURE__*/React.createElement("img", {
    src: src,
    alt: alt,
    style: {
      width: "100%",
      height: "100%",
      objectFit: "cover",
      display: "block"
    }
  }));
  return /*#__PURE__*/React.createElement("div", _extends({
    style: frame
  }, rest), /*#__PURE__*/React.createElement("div", {
    style: {
      position: "absolute",
      inset: 0,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      fontFamily: "var(--font-ui)",
      fontWeight: "var(--weight-bold)",
      fontSize: "var(--type-label-sm)",
      letterSpacing: "var(--tracking-label-wide)",
      color: "var(--grey-500)",
      textTransform: "uppercase",
      backgroundImage: "repeating-linear-gradient(45deg,transparent 0 12px,rgba(36,28,51,.05) 12px 24px)"
    }
  }, label));
}
Object.assign(__ds_scope, { Photo });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Photo.jsx", error: String((e && e.message) || e) }); }

// components/commerce/ProductCard.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/** Product tile: colour-block media panel, name, spec strip, action. */
function ProductCard({
  name,
  price,
  claim,
  badge,
  tone = "blaze",
  image,
  cta = "Add to cart",
  specs = [],
  onAdd,
  style,
  ...rest
}) {
  const media = {
    blaze: "var(--surface-blaze)",
    garlic: "var(--surface-garlic)",
    onion: "var(--surface-onion)",
    scallion: "var(--surface-scallion)",
    cream: "var(--sesame-300)"
  };
  return /*#__PURE__*/React.createElement(__ds_scope.Card, _extends({
    padding: 0,
    lift: true,
    style: {
      display: "flex",
      flexDirection: "column",
      ...style
    }
  }, rest), /*#__PURE__*/React.createElement("div", {
    style: {
      position: "relative",
      background: media[tone],
      borderBottom: "var(--border-2) solid var(--border-strong)",
      padding: "var(--space-5)"
    }
  }, badge ? /*#__PURE__*/React.createElement("span", {
    style: {
      position: "absolute",
      top: 12,
      right: 12,
      zIndex: 2
    }
  }, /*#__PURE__*/React.createElement(__ds_scope.Badge, {
    tone: "paper",
    size: "sm",
    rotate: -5
  }, badge)) : null, /*#__PURE__*/React.createElement(__ds_scope.Photo, {
    src: image,
    ratio: "1 / 1",
    shape: "circle",
    tone: "cream",
    label: name,
    style: {
      border: "var(--border-2) solid var(--border-strong)"
    }
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      padding: "var(--space-4) var(--space-5)",
      display: "flex",
      flexDirection: "column",
      gap: "var(--space-2)",
      flex: 1
    }
  }, /*#__PURE__*/React.createElement("h3", {
    style: {
      margin: 0,
      fontFamily: "var(--font-headline)",
      fontWeight: "var(--weight-black)",
      textTransform: "uppercase",
      fontSize: "var(--type-headline-sm)",
      letterSpacing: "var(--tracking-headline)"
    }
  }, name), claim ? /*#__PURE__*/React.createElement("p", {
    style: {
      margin: 0,
      fontSize: "var(--type-body-sm)",
      color: "var(--text-muted)"
    }
  }, claim) : null, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: "var(--space-3)",
      flexWrap: "wrap",
      fontFamily: "var(--font-mono)",
      fontSize: "var(--type-label-sm)",
      color: "var(--poppy-700)",
      borderTop: "var(--border-1) solid var(--border-soft)",
      borderBottom: "var(--border-1) solid var(--border-soft)",
      padding: "8px 0",
      margin: "var(--space-2) 0"
    }
  }, /*#__PURE__*/React.createElement("span", null, price), specs.map((s, i) => /*#__PURE__*/React.createElement("span", {
    key: i
  }, "\u2014 ", s))), /*#__PURE__*/React.createElement(__ds_scope.Button, {
    fullWidth: true,
    size: "sm",
    onClick: onAdd
  }, cta)));
}
Object.assign(__ds_scope, { ProductCard });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/commerce/ProductCard.jsx", error: String((e && e.message) || e) }); }

// components/core/SectionHeading.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/** Eyebrow + display headline pair that opens every page band. */
function SectionHeading({
  eyebrow,
  title,
  align = "center",
  size = "lg",
  children,
  style,
  ...rest
}) {
  return /*#__PURE__*/React.createElement("header", _extends({
    style: {
      display: "flex",
      flexDirection: "column",
      gap: "var(--space-3)",
      alignItems: align === "center" ? "center" : "flex-start",
      textAlign: align,
      ...style
    }
  }, rest), eyebrow ? /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: "var(--font-ui)",
      fontWeight: "var(--weight-black)",
      textTransform: "uppercase",
      fontSize: "var(--type-label-md)",
      letterSpacing: "var(--tracking-label-wide)",
      color: "var(--blaze-500)"
    }
  }, eyebrow) : null, /*#__PURE__*/React.createElement("h2", {
    style: {
      margin: 0,
      fontFamily: "var(--font-display)",
      fontSize: size === "lg" ? "var(--type-display-md)" : "var(--type-display-sm)",
      lineHeight: "var(--leading-display)",
      letterSpacing: "var(--tracking-display)",
      color: "var(--text-display)",
      fontWeight: 400
    }
  }, title), children ? /*#__PURE__*/React.createElement("p", {
    style: {
      margin: 0,
      maxWidth: "var(--measure-prose)",
      fontSize: "var(--type-body-lg)"
    }
  }, children) : null);
}
Object.assign(__ds_scope, { SectionHeading });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/SectionHeading.jsx", error: String((e && e.message) || e) }); }

// components/core/Tag.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/** Low-emphasis filter / attribute chip. Selectable. */
function Tag({
  selected = false,
  onClick,
  children,
  style,
  ...rest
}) {
  const interactive = typeof onClick === "function";
  return /*#__PURE__*/React.createElement("button", _extends({
    type: "button",
    onClick: onClick,
    disabled: !interactive,
    style: {
      fontFamily: "var(--font-ui)",
      fontWeight: "var(--weight-bold)",
      fontSize: "var(--type-label-sm)",
      textTransform: "uppercase",
      letterSpacing: "var(--tracking-label)",
      padding: "7px 14px",
      borderRadius: "var(--radius-pill)",
      cursor: interactive ? "pointer" : "default",
      border: "var(--border-2) solid var(--border-strong)",
      background: selected ? "var(--surface-ink)" : "transparent",
      color: selected ? "var(--text-on-ink)" : "var(--poppy-800)",
      transition: "background var(--dur-fast) var(--ease-snap),color var(--dur-fast) var(--ease-snap)",
      ...style
    }
  }, rest), children);
}
Object.assign(__ds_scope, { Tag });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Tag.jsx", error: String((e && e.message) || e) }); }

// components/feedback/Dialog.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/** Centred modal on an ink scrim. The only place a blurred shadow is allowed. */
function Dialog({
  open = true,
  title,
  onClose,
  footer,
  children,
  width = 520,
  style,
  ...rest
}) {
  if (!open) return null;
  return /*#__PURE__*/React.createElement("div", {
    style: {
      position: "fixed",
      inset: 0,
      zIndex: 60,
      display: "grid",
      placeItems: "center",
      background: "var(--scrim-ink)",
      backdropFilter: "blur(3px)",
      padding: "var(--space-5)"
    },
    onClick: onClose
  }, /*#__PURE__*/React.createElement("div", _extends({
    role: "dialog",
    "aria-modal": "true",
    onClick: e => e.stopPropagation(),
    style: {
      width: "100%",
      maxWidth: width,
      background: "var(--surface-card)",
      borderRadius: "var(--radius-xl)",
      border: "var(--border-2) solid var(--border-strong)",
      boxShadow: "var(--shadow-overlay)",
      overflow: "hidden",
      ...style
    }
  }, rest), /*#__PURE__*/React.createElement("header", {
    style: {
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      gap: "var(--space-4)",
      padding: "var(--space-5)",
      borderBottom: "var(--border-2) solid var(--border-strong)"
    }
  }, /*#__PURE__*/React.createElement("h2", {
    style: {
      margin: 0,
      fontFamily: "var(--font-display)",
      fontWeight: 400,
      fontSize: "var(--type-display-sm)",
      lineHeight: "var(--leading-display)",
      letterSpacing: "var(--tracking-display)"
    }
  }, title), /*#__PURE__*/React.createElement(__ds_scope.IconButton, {
    name: "x",
    label: "Close",
    variant: "bare",
    size: "sm",
    onClick: onClose
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      padding: "var(--space-5)"
    }
  }, children), footer ? /*#__PURE__*/React.createElement("footer", {
    style: {
      padding: "var(--space-5)",
      borderTop: "var(--border-1) solid var(--border-soft)",
      display: "flex",
      gap: "var(--space-3)",
      justifyContent: "flex-end",
      background: "var(--sesame-300)"
    }
  }, footer) : null));
}
Object.assign(__ds_scope, { Dialog });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/feedback/Dialog.jsx", error: String((e && e.message) || e) }); }

// components/feedback/Toast.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const TONES = {
  success: {
    background: "var(--feedback-success-surface)",
    icon: "check-circle"
  },
  info: {
    background: "var(--feedback-info-surface)",
    icon: "info"
  },
  warning: {
    background: "var(--feedback-warning-surface)",
    icon: "alert-triangle"
  },
  danger: {
    background: "var(--feedback-danger-surface)",
    icon: "alert-circle"
  }
};

/** Inline / floating confirmation strip. */
function Toast({
  tone = "success",
  title,
  children,
  onClose,
  style,
  ...rest
}) {
  const t = TONES[tone] || TONES.success;
  return /*#__PURE__*/React.createElement("div", _extends({
    role: "status",
    style: {
      display: "flex",
      gap: "var(--space-3)",
      alignItems: "flex-start",
      padding: "var(--space-4)",
      borderRadius: "var(--radius-md)",
      background: t.background,
      border: "var(--border-2) solid var(--border-strong)",
      boxShadow: "var(--shadow-sticker)",
      maxWidth: 420,
      ...style
    }
  }, rest), /*#__PURE__*/React.createElement(__ds_scope.Icon, {
    name: t.icon,
    size: 20,
    style: {
      marginTop: 2
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      display: "flex",
      flexDirection: "column",
      gap: "2px"
    }
  }, title ? /*#__PURE__*/React.createElement("span", {
    style: {
      fontWeight: "var(--weight-black)",
      textTransform: "uppercase",
      fontSize: "var(--type-label-md)",
      letterSpacing: "var(--tracking-label)"
    }
  }, title) : null, children ? /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: "var(--type-body-sm)"
    }
  }, children) : null), onClose ? /*#__PURE__*/React.createElement(__ds_scope.IconButton, {
    name: "x",
    label: "Dismiss",
    variant: "bare",
    size: "sm",
    onClick: onClose
  }) : null);
}
Object.assign(__ds_scope, { Toast });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/feedback/Toast.jsx", error: String((e && e.message) || e) }); }

// components/feedback/Tooltip.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/** Hover/focus tip on an ink chip. Text only, no rich content. */
function Tooltip({
  label,
  side = "top",
  children,
  style,
  ...rest
}) {
  const [show, setShow] = React.useState(false);
  const pos = side === "top" ? {
    bottom: "calc(100% + 8px)",
    left: "50%",
    transform: "translateX(-50%)"
  } : {
    top: "calc(100% + 8px)",
    left: "50%",
    transform: "translateX(-50%)"
  };
  return /*#__PURE__*/React.createElement("span", _extends({
    style: {
      position: "relative",
      display: "inline-flex",
      ...style
    },
    onMouseEnter: () => setShow(true),
    onMouseLeave: () => setShow(false),
    onFocus: () => setShow(true),
    onBlur: () => setShow(false)
  }, rest), children, show ? /*#__PURE__*/React.createElement("span", {
    role: "tooltip",
    style: {
      position: "absolute",
      ...pos,
      zIndex: 40,
      whiteSpace: "nowrap",
      background: "var(--surface-ink)",
      color: "var(--text-on-ink)",
      padding: "7px 12px",
      borderRadius: "var(--radius-pill)",
      fontFamily: "var(--font-ui)",
      fontWeight: "var(--weight-bold)",
      fontSize: "var(--type-label-sm)",
      letterSpacing: "var(--tracking-label)",
      textTransform: "uppercase"
    }
  }, label) : null);
}
Object.assign(__ds_scope, { Tooltip });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/feedback/Tooltip.jsx", error: String((e && e.message) || e) }); }

// components/forms/Checkbox.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/** Square checkbox with ink outline and blaze fill when on. */
function Checkbox({
  label,
  checked = false,
  onChange,
  disabled = false,
  style,
  ...rest
}) {
  return /*#__PURE__*/React.createElement("label", _extends({
    style: {
      display: "inline-flex",
      alignItems: "center",
      gap: "var(--space-3)",
      cursor: disabled ? "not-allowed" : "pointer",
      opacity: disabled ? .45 : 1,
      fontSize: "var(--type-body-md)",
      ...style
    }
  }, rest), /*#__PURE__*/React.createElement("input", {
    type: "checkbox",
    checked: checked,
    onChange: onChange,
    disabled: disabled,
    style: {
      position: "absolute",
      opacity: 0,
      width: 1,
      height: 1
    }
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      width: 24,
      height: 24,
      flex: "0 0 auto",
      display: "grid",
      placeItems: "center",
      borderRadius: "var(--radius-sm)",
      border: "var(--border-2) solid var(--border-strong)",
      background: checked ? "var(--action-primary)" : "var(--surface-card)",
      color: "var(--salt-100)",
      boxShadow: "var(--shadow-sticker-sm)",
      transition: "background var(--dur-fast) var(--ease-snap)"
    }
  }, checked ? /*#__PURE__*/React.createElement(__ds_scope.Icon, {
    name: "check",
    size: 15
  }) : null), label);
}
Object.assign(__ds_scope, { Checkbox });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/forms/Checkbox.jsx", error: String((e && e.message) || e) }); }

// components/forms/Input.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/** Text field. Ink outline, pill radius, mono-ish label above. */
function Input({
  label,
  hint,
  error,
  type = "text",
  id,
  style,
  ...rest
}) {
  const uid = id || React.useId();
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexDirection: "column",
      gap: "var(--space-2)",
      width: "100%"
    }
  }, label ? /*#__PURE__*/React.createElement("label", {
    htmlFor: uid,
    style: {
      fontFamily: "var(--font-ui)",
      fontWeight: "var(--weight-bold)",
      fontSize: "var(--type-label-sm)",
      textTransform: "uppercase",
      letterSpacing: "var(--tracking-label)"
    }
  }, label) : null, /*#__PURE__*/React.createElement("input", _extends({
    id: uid,
    type: type,
    style: {
      fontFamily: "var(--font-ui)",
      fontSize: "var(--type-body-md)",
      padding: "13px 18px",
      borderRadius: "var(--radius-pill)",
      background: "var(--surface-card)",
      color: "var(--text-body)",
      border: "var(--border-2) solid " + (error ? "var(--feedback-danger)" : "var(--border-strong)"),
      outline: "none",
      width: "100%",
      ...style
    }
  }, rest)), error ? /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: "var(--type-body-sm)",
      color: "var(--feedback-danger)",
      fontWeight: "var(--weight-bold)"
    }
  }, error) : hint ? /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: "var(--type-body-sm)",
      color: "var(--text-muted)"
    }
  }, hint) : null);
}
Object.assign(__ds_scope, { Input });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/forms/Input.jsx", error: String((e && e.message) || e) }); }

// components/forms/QuantityStepper.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/** Minus / count / plus control for cart and PDP. */
function QuantityStepper({
  value = 1,
  min = 1,
  max = 99,
  onChange,
  size = "md",
  style,
  ...rest
}) {
  const set = n => onChange && onChange(Math.min(max, Math.max(min, n)));
  const px = size === "sm" ? 32 : 40;
  const btn = {
    width: px,
    height: px,
    display: "grid",
    placeItems: "center",
    background: "transparent",
    border: "none",
    cursor: "pointer",
    color: "var(--poppy-800)"
  };
  return /*#__PURE__*/React.createElement("div", _extends({
    style: {
      display: "inline-flex",
      alignItems: "center",
      borderRadius: "var(--radius-pill)",
      border: "var(--border-2) solid var(--border-strong)",
      background: "var(--surface-card)",
      boxShadow: "var(--shadow-sticker-sm)",
      ...style
    }
  }, rest), /*#__PURE__*/React.createElement("button", {
    type: "button",
    "aria-label": "Decrease",
    onClick: () => set(value - 1),
    style: btn
  }, /*#__PURE__*/React.createElement(__ds_scope.Icon, {
    name: "minus",
    size: 16
  })), /*#__PURE__*/React.createElement("span", {
    style: {
      minWidth: 34,
      textAlign: "center",
      fontFamily: "var(--font-mono)",
      fontWeight: 500,
      fontSize: "var(--type-body-md)"
    }
  }, value), /*#__PURE__*/React.createElement("button", {
    type: "button",
    "aria-label": "Increase",
    onClick: () => set(value + 1),
    style: btn
  }, /*#__PURE__*/React.createElement(__ds_scope.Icon, {
    name: "plus",
    size: 16
  })));
}
Object.assign(__ds_scope, { QuantityStepper });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/forms/QuantityStepper.jsx", error: String((e && e.message) || e) }); }

// components/commerce/CartLine.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/** One row in the cart drawer or order summary. */
function CartLine({
  name,
  variant,
  price,
  qty = 1,
  image,
  onQty,
  onRemove,
  style,
  ...rest
}) {
  return /*#__PURE__*/React.createElement("div", _extends({
    style: {
      display: "flex",
      gap: "var(--space-4)",
      alignItems: "center",
      padding: "var(--space-4) 0",
      borderBottom: "var(--border-1) solid var(--border-soft)",
      ...style
    }
  }, rest), /*#__PURE__*/React.createElement(__ds_scope.Photo, {
    src: image,
    ratio: "1 / 1",
    shape: "rounded",
    tone: "cream",
    label: "",
    style: {
      width: 64,
      flex: "0 0 auto"
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      display: "flex",
      flexDirection: "column",
      gap: "4px"
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: "var(--font-headline)",
      fontWeight: "var(--weight-black)",
      textTransform: "uppercase",
      fontSize: "var(--type-label-md)",
      letterSpacing: "var(--tracking-headline)"
    }
  }, name), variant ? /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: "var(--font-mono)",
      fontSize: "var(--type-label-sm)",
      color: "var(--text-muted)"
    }
  }, variant) : null, /*#__PURE__*/React.createElement(__ds_scope.QuantityStepper, {
    value: qty,
    size: "sm",
    onChange: onQty,
    style: {
      marginTop: 6
    }
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexDirection: "column",
      alignItems: "flex-end",
      gap: "var(--space-2)"
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: "var(--font-mono)",
      fontWeight: 500
    }
  }, price), /*#__PURE__*/React.createElement(__ds_scope.IconButton, {
    name: "x",
    label: "Remove " + name,
    variant: "bare",
    size: "sm",
    onClick: onRemove
  })));
}
Object.assign(__ds_scope, { CartLine });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/commerce/CartLine.jsx", error: String((e && e.message) || e) }); }

// components/forms/Radio.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/** Radio option, optionally rendered as a full selectable panel. */
function Radio({
  label,
  description,
  checked = false,
  onChange,
  name,
  value,
  panel = false,
  style,
  ...rest
}) {
  const dot = /*#__PURE__*/React.createElement("span", {
    style: {
      width: 24,
      height: 24,
      flex: "0 0 auto",
      display: "grid",
      placeItems: "center",
      borderRadius: "var(--radius-pill)",
      border: "var(--border-2) solid var(--border-strong)",
      background: "var(--surface-card)",
      boxShadow: "var(--shadow-sticker-sm)"
    }
  }, checked ? /*#__PURE__*/React.createElement("span", {
    style: {
      width: 11,
      height: 11,
      borderRadius: "var(--radius-pill)",
      background: "var(--action-primary)"
    }
  }) : null);
  const inner = /*#__PURE__*/React.createElement(React.Fragment, null, dot, /*#__PURE__*/React.createElement("span", {
    style: {
      display: "flex",
      flexDirection: "column",
      gap: "2px",
      textAlign: "left"
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontWeight: "var(--weight-bold)"
    }
  }, label), description ? /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: "var(--type-body-sm)",
      color: "var(--text-muted)"
    }
  }, description) : null));
  return /*#__PURE__*/React.createElement("label", _extends({
    style: {
      display: "flex",
      alignItems: panel ? "flex-start" : "center",
      gap: "var(--space-3)",
      cursor: "pointer",
      fontSize: "var(--type-body-md)",
      ...(panel ? {
        padding: "var(--space-4)",
        borderRadius: "var(--radius-md)",
        border: "var(--border-2) solid " + (checked ? "var(--border-blaze)" : "var(--border-strong)"),
        background: checked ? "var(--blaze-100)" : "var(--surface-card)"
      } : null),
      ...style
    }
  }, rest), /*#__PURE__*/React.createElement("input", {
    type: "radio",
    name: name,
    value: value,
    checked: checked,
    onChange: onChange,
    style: {
      position: "absolute",
      opacity: 0,
      width: 1,
      height: 1
    }
  }), inner);
}
Object.assign(__ds_scope, { Radio });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/forms/Radio.jsx", error: String((e && e.message) || e) }); }

// components/forms/Select.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/** Native select in brand chrome. */
function Select({
  label,
  options = [],
  id,
  style,
  ...rest
}) {
  const uid = id || React.useId();
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexDirection: "column",
      gap: "var(--space-2)",
      width: "100%"
    }
  }, label ? /*#__PURE__*/React.createElement("label", {
    htmlFor: uid,
    style: {
      fontFamily: "var(--font-ui)",
      fontWeight: "var(--weight-bold)",
      fontSize: "var(--type-label-sm)",
      textTransform: "uppercase",
      letterSpacing: "var(--tracking-label)"
    }
  }, label) : null, /*#__PURE__*/React.createElement("div", {
    style: {
      position: "relative",
      display: "flex",
      alignItems: "center"
    }
  }, /*#__PURE__*/React.createElement("select", _extends({
    id: uid,
    style: {
      appearance: "none",
      fontFamily: "var(--font-ui)",
      fontSize: "var(--type-body-md)",
      padding: "13px 44px 13px 18px",
      borderRadius: "var(--radius-pill)",
      background: "var(--surface-card)",
      border: "var(--border-2) solid var(--border-strong)",
      color: "var(--text-body)",
      width: "100%",
      cursor: "pointer",
      ...style
    }
  }, rest), options.map(o => {
    const val = typeof o === "string" ? o : o.value;
    const lab = typeof o === "string" ? o : o.label;
    return /*#__PURE__*/React.createElement("option", {
      key: val,
      value: val
    }, lab);
  })), /*#__PURE__*/React.createElement(__ds_scope.Icon, {
    name: "chevron-down",
    size: 18,
    style: {
      position: "absolute",
      right: 16,
      pointerEvents: "none"
    }
  })));
}
Object.assign(__ds_scope, { Select });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/forms/Select.jsx", error: String((e && e.message) || e) }); }

// components/forms/Switch.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/** Toggle for settings and subscription controls. */
function Switch({
  label,
  checked = false,
  onChange,
  disabled = false,
  style,
  ...rest
}) {
  return /*#__PURE__*/React.createElement("label", _extends({
    style: {
      display: "inline-flex",
      alignItems: "center",
      gap: "var(--space-3)",
      cursor: disabled ? "not-allowed" : "pointer",
      opacity: disabled ? .45 : 1,
      fontSize: "var(--type-body-md)",
      ...style
    }
  }, rest), /*#__PURE__*/React.createElement("input", {
    type: "checkbox",
    role: "switch",
    checked: checked,
    disabled: disabled,
    onChange: onChange,
    style: {
      position: "absolute",
      opacity: 0,
      width: 1,
      height: 1
    }
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      width: 54,
      height: 30,
      borderRadius: "var(--radius-pill)",
      padding: 3,
      display: "flex",
      alignItems: "center",
      justifyContent: checked ? "flex-end" : "flex-start",
      border: "var(--border-2) solid var(--border-strong)",
      boxShadow: "var(--shadow-sticker-sm)",
      background: checked ? "var(--surface-scallion)" : "var(--sesame-300)",
      transition: "background var(--dur-med) var(--ease-snap)"
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      width: 22,
      height: 22,
      borderRadius: "var(--radius-pill)",
      background: "var(--salt-100)",
      border: "var(--border-1) solid var(--border-strong)",
      transition: "transform var(--dur-med) var(--ease-pop)"
    }
  })), label);
}
Object.assign(__ds_scope, { Switch });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/forms/Switch.jsx", error: String((e && e.message) || e) }); }

// components/navigation/Footer.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/** Site footer: giant wordmark, link columns, signup, socials. */
function Footer({
  columns = [],
  note = "© EBTB. Everything but the bagel.",
  style,
  ...rest
}) {
  return /*#__PURE__*/React.createElement("footer", _extends({
    style: {
      background: "var(--surface-ink)",
      color: "var(--text-on-ink)",
      borderTop: "var(--border-2) solid var(--border-strong)",
      padding: "var(--space-8) var(--gutter-inline) var(--space-5)",
      ...style
    }
  }, rest), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: "var(--space-8)",
      flexWrap: "wrap",
      justifyContent: "space-between"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexDirection: "column",
      gap: "var(--space-4)",
      maxWidth: 360
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: "var(--font-display)",
      fontSize: 64,
      lineHeight: .9,
      color: "var(--garlic-500)",
      letterSpacing: "var(--tracking-display)"
    }
  }, "EBTB"), /*#__PURE__*/React.createElement("p", {
    style: {
      margin: 0,
      fontSize: "var(--type-body-sm)",
      opacity: .85
    }
  }, "Get a jar's worth of good news. No spam, just seasoning."), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: "var(--space-2)",
      alignItems: "flex-end"
    }
  }, /*#__PURE__*/React.createElement(__ds_scope.Input, {
    placeholder: "you@example.com",
    style: {
      minWidth: 200
    }
  }), /*#__PURE__*/React.createElement(__ds_scope.Button, {
    size: "sm",
    variant: "garlic"
  }, "Join"))), columns.map(col => /*#__PURE__*/React.createElement("div", {
    key: col.title,
    style: {
      display: "flex",
      flexDirection: "column",
      gap: "var(--space-3)"
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: "var(--font-ui)",
      fontWeight: "var(--weight-black)",
      textTransform: "uppercase",
      fontSize: "var(--type-label-sm)",
      letterSpacing: "var(--tracking-label-wide)",
      color: "var(--garlic-300)"
    }
  }, col.title), col.links.map(l => /*#__PURE__*/React.createElement("span", {
    key: l,
    style: {
      fontSize: "var(--type-body-sm)",
      opacity: .9
    }
  }, l))))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      gap: "var(--space-4)",
      marginTop: "var(--space-7)",
      paddingTop: "var(--space-4)",
      borderTop: "var(--border-1) solid rgba(255,253,247,.25)",
      fontFamily: "var(--font-mono)",
      fontSize: "var(--type-label-sm)",
      opacity: .8
    }
  }, /*#__PURE__*/React.createElement("span", null, note), /*#__PURE__*/React.createElement("span", {
    style: {
      display: "flex",
      gap: "var(--space-3)"
    }
  }, /*#__PURE__*/React.createElement(__ds_scope.Icon, {
    name: "instagram",
    size: 18
  }), /*#__PURE__*/React.createElement(__ds_scope.Icon, {
    name: "youtube",
    size: 18
  }), /*#__PURE__*/React.createElement(__ds_scope.Icon, {
    name: "mail",
    size: 18
  }))));
}
Object.assign(__ds_scope, { Footer });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/navigation/Footer.jsx", error: String((e && e.message) || e) }); }

// components/navigation/NavBar.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/** Top site bar: wordmark, boxed links, cart. */
function NavBar({
  links = [],
  active,
  onNavigate,
  cartCount = 0,
  onCart,
  cta = "Shop",
  onCta,
  style,
  ...rest
}) {
  return /*#__PURE__*/React.createElement("nav", _extends({
    style: {
      display: "flex",
      alignItems: "center",
      gap: "var(--space-5)",
      padding: "var(--space-3) var(--gutter-inline)",
      background: "var(--surface-card)",
      borderBottom: "var(--border-2) solid var(--border-strong)",
      ...style
    }
  }, rest), /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: "var(--font-display)",
      fontSize: 28,
      lineHeight: 1,
      color: "var(--blaze-500)",
      letterSpacing: "var(--tracking-display)"
    }
  }, "EBTB"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: "var(--space-2)",
      flex: 1
    }
  }, links.map(l => /*#__PURE__*/React.createElement("button", {
    key: l,
    onClick: () => onNavigate && onNavigate(l),
    style: {
      fontFamily: "var(--font-ui)",
      fontWeight: "var(--weight-bold)",
      fontSize: "var(--type-label-sm)",
      textTransform: "uppercase",
      letterSpacing: "var(--tracking-label)",
      padding: "9px 14px",
      cursor: "pointer",
      borderRadius: "var(--radius-pill)",
      border: "var(--border-2) solid var(--border-strong)",
      background: active === l ? "var(--surface-ink)" : "transparent",
      color: active === l ? "var(--text-on-ink)" : "var(--poppy-800)"
    }
  }, l))), /*#__PURE__*/React.createElement(__ds_scope.Button, {
    size: "sm",
    onClick: onCta
  }, cta), /*#__PURE__*/React.createElement("span", {
    style: {
      position: "relative",
      display: "inline-flex"
    }
  }, /*#__PURE__*/React.createElement(__ds_scope.IconButton, {
    name: "shopping-bag",
    label: "Cart",
    onClick: onCart
  }), cartCount > 0 ? /*#__PURE__*/React.createElement("span", {
    style: {
      position: "absolute",
      top: -6,
      right: -6,
      minWidth: 22,
      height: 22,
      padding: "0 5px",
      display: "grid",
      placeItems: "center",
      borderRadius: "var(--radius-pill)",
      background: "var(--action-primary)",
      color: "var(--text-on-blaze)",
      border: "var(--border-2) solid var(--border-strong)",
      fontFamily: "var(--font-mono)",
      fontSize: 11
    }
  }, cartCount) : null));
}
Object.assign(__ds_scope, { NavBar });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/navigation/NavBar.jsx", error: String((e && e.message) || e) }); }

// components/navigation/Tabs.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/** Segmented pill tabs for switching panels within a screen. */
function Tabs({
  items = [],
  value,
  onChange,
  style,
  ...rest
}) {
  return /*#__PURE__*/React.createElement("div", _extends({
    role: "tablist",
    style: {
      display: "inline-flex",
      gap: "4px",
      padding: "4px",
      borderRadius: "var(--radius-pill)",
      border: "var(--border-2) solid var(--border-strong)",
      background: "var(--sesame-300)",
      ...style
    }
  }, rest), items.map(it => {
    const on = value === it;
    return /*#__PURE__*/React.createElement("button", {
      key: it,
      role: "tab",
      "aria-selected": on,
      onClick: () => onChange && onChange(it),
      style: {
        fontFamily: "var(--font-ui)",
        fontWeight: "var(--weight-bold)",
        fontSize: "var(--type-label-sm)",
        textTransform: "uppercase",
        letterSpacing: "var(--tracking-label)",
        padding: "9px 18px",
        cursor: "pointer",
        border: "none",
        borderRadius: "var(--radius-pill)",
        background: on ? "var(--surface-card)" : "transparent",
        boxShadow: on ? "var(--shadow-sticker-sm)" : "none",
        color: "var(--poppy-800)",
        transition: "background var(--dur-fast) var(--ease-snap)"
      }
    }, it);
  }));
}
Object.assign(__ds_scope, { Tabs });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/navigation/Tabs.jsx", error: String((e && e.message) || e) }); }

// ui_kits/spice-club/Account.jsx
try { (() => {
const {
  Card,
  Input,
  Select,
  Button,
  Checkbox,
  Switch,
  Toast,
  SpecStrip
} = window.EBTBDesignSystem_c7b8b1;
function Account() {
  const [saved, setSaved] = React.useState(false);
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: "grid",
      gridTemplateColumns: "1.1fr .9fr",
      gap: "var(--grid-gap)",
      alignItems: "start"
    }
  }, /*#__PURE__*/React.createElement(Card, {
    tone: "paper",
    padding: "var(--space-5)",
    style: {
      display: "flex",
      flexDirection: "column",
      gap: "var(--space-4)"
    }
  }, /*#__PURE__*/React.createElement("span", {
    className: "ebtb-label",
    style: {
      color: "var(--text-muted)"
    }
  }, "Shipping address"), /*#__PURE__*/React.createElement(Input, {
    label: "Name",
    defaultValue: "Dana Reyes"
  }), /*#__PURE__*/React.createElement(Input, {
    label: "Street",
    defaultValue: "418 Union Ave, Apt 3R"
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "grid",
      gridTemplateColumns: "1.4fr .6fr",
      gap: "var(--space-3)"
    }
  }, /*#__PURE__*/React.createElement(Input, {
    label: "City",
    defaultValue: "Brooklyn"
  }), /*#__PURE__*/React.createElement(Input, {
    label: "Zip",
    defaultValue: "11211"
  })), /*#__PURE__*/React.createElement(Select, {
    label: "Delivery window",
    options: ["Any day", "Weekdays only", "Weekends only"]
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: "var(--space-3)",
      alignItems: "center"
    }
  }, /*#__PURE__*/React.createElement(Button, {
    onClick: () => setSaved(true)
  }, "Save changes"), /*#__PURE__*/React.createElement(Button, {
    variant: "ghost"
  }, "Discard")), saved ? /*#__PURE__*/React.createElement(Toast, {
    tone: "success",
    title: "Saved",
    onClose: () => setSaved(false)
  }, "Your address is updated.") : null), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexDirection: "column",
      gap: "var(--grid-gap)"
    }
  }, /*#__PURE__*/React.createElement(Card, {
    tone: "cream",
    padding: "var(--space-5)",
    style: {
      display: "flex",
      flexDirection: "column",
      gap: "var(--space-3)"
    }
  }, /*#__PURE__*/React.createElement("span", {
    className: "ebtb-label",
    style: {
      color: "var(--text-muted)"
    }
  }, "Payment"), /*#__PURE__*/React.createElement(SpecStrip, {
    align: "left",
    items: ["VISA •••• 4242", "EXP 08/28"]
  }), /*#__PURE__*/React.createElement(Button, {
    variant: "outline",
    size: "sm",
    style: {
      alignSelf: "flex-start"
    }
  }, "Update card")), /*#__PURE__*/React.createElement(Card, {
    tone: "paper",
    padding: "var(--space-5)",
    style: {
      display: "flex",
      flexDirection: "column",
      gap: "var(--space-3)"
    }
  }, /*#__PURE__*/React.createElement("span", {
    className: "ebtb-label",
    style: {
      color: "var(--text-muted)"
    }
  }, "Notifications"), /*#__PURE__*/React.createElement(Switch, {
    label: "Ship reminders",
    checked: true,
    onChange: () => {}
  }), /*#__PURE__*/React.createElement(Switch, {
    label: "New blend drops",
    checked: true,
    onChange: () => {}
  }), /*#__PURE__*/React.createElement(Checkbox, {
    label: "Recipe emails, twice a month",
    checked: true,
    onChange: () => {}
  })), /*#__PURE__*/React.createElement(Card, {
    tone: "ink",
    padding: "var(--space-5)",
    style: {
      display: "flex",
      flexDirection: "column",
      gap: "var(--space-3)"
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: "var(--font-display)",
      fontSize: 26,
      lineHeight: 1,
      color: "var(--garlic-300)"
    }
  }, "Leaving us?"), /*#__PURE__*/React.createElement("p", {
    style: {
      margin: 0,
      fontSize: "var(--type-body-sm)",
      opacity: .9
    }
  }, "Pause instead \u2014 we'll hold your price for six months."), /*#__PURE__*/React.createElement(Button, {
    variant: "garlic",
    size: "sm",
    style: {
      alignSelf: "flex-start"
    }
  }, "Pause the club"))));
}
window.Account = Account;
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/spice-club/Account.jsx", error: String((e && e.message) || e) }); }

// ui_kits/spice-club/Blends.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const {
  Card,
  Button,
  Badge,
  Tag,
  ProductCard,
  SectionHeading
} = window.EBTBDesignSystem_c7b8b1;
function Blends() {
  const [swapped, setSwapped] = React.useState("Everything Blend");
  const options = [{
    name: "Everything Blend",
    price: "$12",
    claim: "The original. Zero bagel.",
    tone: "blaze",
    specs: ["2.3 oz"]
  }, {
    name: "Extra Garlic",
    price: "$13",
    claim: "For people who mean it.",
    tone: "garlic",
    specs: ["2.3 oz"]
  }, {
    name: "Chile Everything",
    price: "$13",
    claim: "Blend one, plus a slow burn.",
    tone: "onion",
    specs: ["2.3 oz"]
  }, {
    name: "Sesame Only",
    price: "$11",
    claim: "Two sesames, nothing louder.",
    tone: "scallion",
    specs: ["2.3 oz"]
  }];
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexDirection: "column",
      gap: "var(--space-5)"
    }
  }, /*#__PURE__*/React.createElement(SectionHeading, {
    align: "left",
    size: "sm",
    eyebrow: "Your club",
    title: "Pick what turns up next"
  }, "Swap any time before the ship date. Your price stays the same."), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: "var(--space-2)",
      flexWrap: "wrap"
    }
  }, /*#__PURE__*/React.createElement(Tag, {
    selected: true
  }, "In rotation"), /*#__PURE__*/React.createElement(Tag, {
    onClick: () => {}
  }, "Tried before"), /*#__PURE__*/React.createElement(Tag, {
    onClick: () => {}
  }, "Never tried")), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "grid",
      gridTemplateColumns: "repeat(4,1fr)",
      gap: "var(--grid-gap)"
    }
  }, options.map(o => /*#__PURE__*/React.createElement("div", {
    key: o.name,
    style: {
      position: "relative"
    }
  }, swapped === o.name ? /*#__PURE__*/React.createElement("span", {
    style: {
      position: "absolute",
      top: -10,
      left: 12,
      zIndex: 3
    }
  }, /*#__PURE__*/React.createElement(Badge, {
    tone: "ink",
    size: "sm"
  }, "In rotation")) : null, /*#__PURE__*/React.createElement(ProductCard, _extends({}, o, {
    cta: swapped === o.name ? "Current pick" : "Swap in",
    onAdd: () => setSwapped(o.name)
  }))))), /*#__PURE__*/React.createElement(Card, {
    tone: "scallion",
    padding: "var(--space-5)",
    style: {
      display: "flex",
      gap: "var(--space-5)",
      alignItems: "center",
      flexWrap: "wrap"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      minWidth: 240
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: "var(--font-display)",
      fontSize: 30,
      lineHeight: 1
    }
  }, "Refer a shaker, get a jar"), /*#__PURE__*/React.createElement("p", {
    style: {
      margin: "6px 0 0",
      fontSize: "var(--type-body-sm)"
    }
  }, "They get 15% off their first order. You get a free 2.3 oz on your next delivery.")), /*#__PURE__*/React.createElement(Button, {
    variant: "ink"
  }, "Copy your link")));
}
window.Blends = Blends;
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/spice-club/Blends.jsx", error: String((e && e.message) || e) }); }

// ui_kits/spice-club/Deliveries.jsx
try { (() => {
const {
  Card,
  Button,
  Badge,
  Switch,
  Dialog,
  Toast,
  SpecStrip,
  Photo,
  IconButton,
  Icon,
  PriceTag
} = window.EBTBDesignSystem_c7b8b1;
function Deliveries() {
  const [paused, setPaused] = React.useState(false);
  const [skipOpen, setSkipOpen] = React.useState(false);
  const [skipped, setSkipped] = React.useState(false);
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexDirection: "column",
      gap: "var(--space-5)"
    }
  }, skipped ? /*#__PURE__*/React.createElement(Toast, {
    tone: "success",
    title: "Shipment skipped",
    onClose: () => setSkipped(false)
  }, "Next jar now lands 12 Oct.") : null, /*#__PURE__*/React.createElement(Card, {
    tone: "paper",
    padding: "0",
    style: {
      overflow: "hidden"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: "var(--space-5)",
      alignItems: "center",
      padding: "var(--space-5)",
      background: "var(--surface-onion)",
      color: "var(--salt-100)",
      borderBottom: "var(--border-2) solid var(--border-strong)"
    }
  }, /*#__PURE__*/React.createElement(Photo, {
    shape: "circle",
    ratio: "1 / 1",
    label: "",
    style: {
      width: 74,
      flex: "0 0 auto"
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      display: "flex",
      flexDirection: "column",
      gap: 6
    }
  }, /*#__PURE__*/React.createElement(Badge, {
    tone: "garlic",
    size: "sm",
    style: {
      alignSelf: "flex-start"
    }
  }, skipped ? "Next: 12 Oct" : "Next: 14 Aug"), /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: "var(--font-display)",
      fontSize: 30,
      lineHeight: 1,
      color: "var(--garlic-300)"
    }
  }, "Everything Blend \xD72"), /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: "var(--font-mono)",
      fontSize: "var(--type-label-md)",
      opacity: .9
    }
  }, "Every 8 weeks \u2014 2.3 oz jars")), /*#__PURE__*/React.createElement(PriceTag, {
    price: "$24.00",
    size: "md",
    style: {
      color: "var(--salt-100)"
    }
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      padding: "var(--space-5)",
      display: "flex",
      gap: "var(--space-3)",
      flexWrap: "wrap",
      alignItems: "center"
    }
  }, /*#__PURE__*/React.createElement(Button, {
    size: "sm",
    variant: "outline",
    onClick: () => setSkipOpen(true)
  }, "Skip next"), /*#__PURE__*/React.createElement(Button, {
    size: "sm",
    variant: "outline"
  }, "Change date"), /*#__PURE__*/React.createElement(Button, {
    size: "sm",
    variant: "outline"
  }, "Swap blend"), /*#__PURE__*/React.createElement(Switch, {
    label: "Pause club",
    checked: paused,
    onChange: e => setPaused(e.target.checked),
    style: {
      marginLeft: "auto"
    }
  }))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "grid",
      gridTemplateColumns: "repeat(3,1fr)",
      gap: "var(--grid-gap)"
    }
  }, [["piggy-bank", "Saved so far", "$41.20"], ["package", "Jars delivered", "14"], ["calendar", "Member since", "Mar 2024"]].map(([ic, l, v]) => /*#__PURE__*/React.createElement(Card, {
    key: l,
    tone: "cream",
    padding: "var(--space-5)",
    style: {
      display: "flex",
      flexDirection: "column",
      gap: 8
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: ic,
    size: 20
  }), /*#__PURE__*/React.createElement("span", {
    className: "ebtb-label",
    style: {
      color: "var(--text-muted)"
    }
  }, l), /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: "var(--font-display)",
      fontSize: 34,
      lineHeight: 1
    }
  }, v)))), /*#__PURE__*/React.createElement(Card, {
    tone: "paper",
    padding: "var(--space-5)"
  }, /*#__PURE__*/React.createElement("span", {
    className: "ebtb-label",
    style: {
      color: "var(--text-muted)"
    }
  }, "Delivery history"), [["19 Jun 2025", "Everything Blend ×2", "$24.00"], ["24 Apr 2025", "Everything Blend ×2", "$24.00"], ["28 Feb 2025", "Chile Everything ×1", "$13.00"]].map(([d, item, amt]) => /*#__PURE__*/React.createElement("div", {
    key: d,
    style: {
      display: "flex",
      alignItems: "center",
      gap: "var(--space-4)",
      padding: "var(--space-3) 0",
      borderBottom: "var(--border-1) solid var(--border-soft)"
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: "var(--font-mono)",
      fontSize: "var(--type-label-md)",
      width: 120
    }
  }, d), /*#__PURE__*/React.createElement("span", {
    style: {
      flex: 1,
      fontWeight: 700
    }
  }, item), /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: "var(--font-mono)"
    }
  }, amt), /*#__PURE__*/React.createElement(IconButton, {
    name: "receipt",
    label: "Receipt",
    variant: "bare",
    size: "sm"
  })))), /*#__PURE__*/React.createElement(Dialog, {
    open: skipOpen,
    title: "Skip this shipment?",
    onClose: () => setSkipOpen(false),
    footer: /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(Button, {
      size: "sm",
      variant: "ghost",
      onClick: () => setSkipOpen(false)
    }, "Never mind"), /*#__PURE__*/React.createElement(Button, {
      size: "sm",
      onClick: () => {
        setSkipped(true);
        setSkipOpen(false);
      }
    }, "Skip it"))
  }, /*#__PURE__*/React.createElement("p", {
    style: {
      margin: 0
    }
  }, "Your next jar will land 12 October instead. Nothing else changes.")));
}
window.Deliveries = Deliveries;
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/spice-club/Deliveries.jsx", error: String((e && e.message) || e) }); }

// ui_kits/storefront/CartDrawer.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const {
  CartLine,
  Button,
  PriceTag,
  Card,
  IconButton,
  Toast,
  Checkbox
} = window.EBTBDesignSystem_c7b8b1;
function CartDrawer({
  open,
  lines,
  onClose,
  onQty,
  onRemove
}) {
  const [gift, setGift] = React.useState(false);
  if (!open) return null;
  const total = lines.reduce((s, l) => s + l.qty * parseFloat(String(l.price).replace(/[^0-9.]/g, "")), 0);
  return /*#__PURE__*/React.createElement("div", {
    style: {
      position: "fixed",
      inset: 0,
      zIndex: 70,
      background: "var(--scrim-ink)",
      display: "flex",
      justifyContent: "flex-end"
    },
    onClick: onClose
  }, /*#__PURE__*/React.createElement("aside", {
    onClick: e => e.stopPropagation(),
    style: {
      width: "min(440px,100%)",
      background: "var(--surface-card)",
      borderLeft: "var(--border-2) solid var(--border-strong)",
      display: "flex",
      flexDirection: "column"
    }
  }, /*#__PURE__*/React.createElement("header", {
    style: {
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      padding: "var(--space-5)",
      borderBottom: "var(--border-2) solid var(--border-strong)"
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: "var(--font-display)",
      fontSize: 34,
      lineHeight: 1
    }
  }, "Your bag"), /*#__PURE__*/React.createElement(IconButton, {
    name: "x",
    label: "Close cart",
    variant: "bare",
    onClick: onClose
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      overflow: "auto",
      padding: "0 var(--space-5)"
    }
  }, lines.length === 0 ? /*#__PURE__*/React.createElement("p", {
    style: {
      padding: "var(--space-6) 0",
      color: "var(--text-muted)"
    }
  }, "Nothing in here yet. Suspicious.") : lines.map((l, i) => /*#__PURE__*/React.createElement(CartLine, _extends({
    key: l.name
  }, l, {
    onQty: n => onQty(i, n),
    onRemove: () => onRemove(i)
  }))), lines.length > 0 ? /*#__PURE__*/React.createElement("div", {
    style: {
      padding: "var(--space-4) 0"
    }
  }, /*#__PURE__*/React.createElement(Checkbox, {
    label: "Add a gift note",
    checked: gift,
    onChange: e => setGift(e.target.checked)
  })) : null, total > 0 && total < 35 ? /*#__PURE__*/React.createElement(Toast, {
    tone: "info",
    title: "Almost free shipping",
    style: {
      margin: "var(--space-2) 0 var(--space-5)"
    }
  }, "Add $" + (35 - total).toFixed(2) + " to skip the $5 flat rate.") : null), /*#__PURE__*/React.createElement("footer", {
    style: {
      padding: "var(--space-5)",
      borderTop: "var(--border-2) solid var(--border-strong)",
      background: "var(--sesame-300)",
      display: "flex",
      flexDirection: "column",
      gap: "var(--space-4)"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "baseline"
    }
  }, /*#__PURE__*/React.createElement("span", {
    className: "ebtb-label"
  }, "Subtotal"), /*#__PURE__*/React.createElement(PriceTag, {
    price: "$" + total.toFixed(2),
    size: "md"
  })), /*#__PURE__*/React.createElement(Button, {
    fullWidth: true,
    size: "lg",
    disabled: lines.length === 0
  }, "Checkout"), /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: "var(--font-mono)",
      fontSize: "var(--type-label-sm)",
      color: "var(--text-muted)",
      textAlign: "center"
    }
  }, "Free shipping over $35 \u2014 flat $5 under"))));
}
window.CartDrawer = CartDrawer;
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/storefront/CartDrawer.jsx", error: String((e && e.message) || e) }); }

// ui_kits/storefront/Collection.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const {
  SectionHeading,
  Tag,
  Select,
  ProductCard,
  Card,
  Photo,
  Button
} = window.EBTBDesignSystem_c7b8b1;
const ALL = [{
  name: "Everything Blend",
  price: "$12",
  claim: "The original. Zero bagel.",
  badge: "Best seller",
  tone: "blaze",
  specs: ["2.3 oz"],
  cat: "Blends"
}, {
  name: "Extra Garlic",
  price: "$13",
  claim: "For people who mean it.",
  tone: "garlic",
  specs: ["2.3 oz"],
  cat: "Blends"
}, {
  name: "Chile Everything",
  price: "$13",
  claim: "Blend one, plus a slow burn.",
  badge: "New",
  tone: "onion",
  specs: ["2.3 oz"],
  cat: "Blends"
}, {
  name: "Sesame Only",
  price: "$11",
  claim: "Two sesames, nothing louder.",
  tone: "scallion",
  specs: ["2.3 oz"],
  cat: "Blends"
}, {
  name: "Refill Pouch",
  price: "$24",
  claim: "Sixteen ounces of restock.",
  tone: "cream",
  specs: ["16 oz"],
  cat: "Refills"
}, {
  name: "Trio Pouches",
  price: "$60",
  claim: "All three blends, big format.",
  tone: "blaze",
  specs: ["3 × 16 oz"],
  cat: "Refills"
}, {
  name: "Shaker Jar",
  price: "$9",
  claim: "Glass, cork lid, dishwasher-safe.",
  tone: "garlic",
  specs: ["Gear"],
  cat: "Gear"
}, {
  name: "Starter Bundle",
  price: "$28",
  claim: "Jar + blend + a very good tote.",
  badge: "Save $6",
  tone: "onion",
  specs: ["Bundle"],
  cat: "Bundles"
}];
function Collection({
  onAdd,
  onOpen
}) {
  const [cat, setCat] = React.useState("All");
  const cats = ["All", "Blends", "Refills", "Bundles", "Gear"];
  const list = cat === "All" ? ALL : ALL.filter(p => p.cat === cat);
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("section", {
    style: {
      padding: "var(--space-7) var(--gutter-inline) var(--space-5)",
      display: "flex",
      flexDirection: "column",
      gap: "var(--space-5)",
      background: "var(--sesame-300)",
      borderBottom: "var(--border-2) solid var(--border-strong)"
    }
  }, /*#__PURE__*/React.createElement(SectionHeading, {
    align: "left",
    eyebrow: "Shop all",
    title: "Everything, in every format"
  }, "Eight ways to keep a jar within arm's reach."), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: "var(--space-3)",
      alignItems: "center",
      justifyContent: "space-between",
      flexWrap: "wrap"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: "var(--space-2)",
      flexWrap: "wrap"
    }
  }, cats.map(c => /*#__PURE__*/React.createElement(Tag, {
    key: c,
    selected: cat === c,
    onClick: () => setCat(c)
  }, c))), /*#__PURE__*/React.createElement("div", {
    style: {
      width: 220
    }
  }, /*#__PURE__*/React.createElement(Select, {
    options: ["Most shaken", "Newest", "Price: low to high"]
  })))), /*#__PURE__*/React.createElement("section", {
    style: {
      padding: "var(--space-6) var(--gutter-inline) var(--section-y)",
      display: "grid",
      gridTemplateColumns: "repeat(4,1fr)",
      gap: "var(--grid-gap)"
    }
  }, list.map(p => /*#__PURE__*/React.createElement("div", {
    key: p.name,
    onClick: () => onOpen(p),
    style: {
      cursor: "pointer"
    }
  }, /*#__PURE__*/React.createElement(ProductCard, _extends({}, p, {
    onAdd: e => onAdd(p)
  })))), /*#__PURE__*/React.createElement(Card, {
    tone: "ink",
    padding: "var(--space-5)",
    style: {
      display: "flex",
      flexDirection: "column",
      gap: "var(--space-3)",
      justifyContent: "center"
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: "var(--font-display)",
      fontSize: 34,
      lineHeight: .95,
      color: "var(--garlic-300)"
    }
  }, "Can't choose?"), /*#__PURE__*/React.createElement("p", {
    style: {
      margin: 0,
      fontSize: "var(--type-body-sm)",
      opacity: .9
    }
  }, "The trio pouch covers every blend and saves you nine dollars."), /*#__PURE__*/React.createElement(Button, {
    variant: "garlic",
    size: "sm",
    style: {
      alignSelf: "flex-start"
    }
  }, "Get the trio"))));
}
window.Collection = Collection;
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/storefront/Collection.jsx", error: String((e && e.message) || e) }); }

// ui_kits/storefront/Home.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const {
  NavBar,
  Marquee,
  Button,
  Badge,
  Card,
  Photo,
  SectionHeading,
  ProductCard,
  SpecStrip,
  Icon,
  Tag
} = window.EBTBDesignSystem_c7b8b1;
function Hero({
  onShop
}) {
  return /*#__PURE__*/React.createElement("section", {
    style: {
      display: "grid",
      gridTemplateColumns: "1.05fr .95fr",
      alignItems: "stretch",
      background: "var(--surface-onion)",
      borderBottom: "var(--border-2) solid var(--border-strong)"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      padding: "clamp(32px,5vw,72px) var(--gutter-inline)",
      display: "flex",
      flexDirection: "column",
      gap: "var(--space-5)",
      justifyContent: "center",
      color: "var(--salt-100)"
    }
  }, /*#__PURE__*/React.createElement(Badge, {
    tone: "garlic",
    rotate: -3,
    style: {
      alignSelf: "flex-start"
    }
  }, "Small batch \xB7 big shake"), /*#__PURE__*/React.createElement("h1", {
    style: {
      margin: 0,
      fontFamily: "var(--font-display)",
      fontWeight: 400,
      fontSize: "var(--type-display-lg)",
      lineHeight: "var(--leading-display)",
      letterSpacing: "var(--tracking-display)",
      color: "var(--garlic-300)"
    }
  }, "Everything", /*#__PURE__*/React.createElement("br", null), "but the bagel"), /*#__PURE__*/React.createElement("p", {
    style: {
      margin: 0,
      maxWidth: "44ch",
      fontSize: "var(--type-body-lg)"
    }
  }, "Six toasted ingredients in one jar. Sprinkle it on eggs, avocado, popcorn, tomatoes \u2014 anything that isn't a bagel."), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: "var(--space-3)",
      flexWrap: "wrap"
    }
  }, /*#__PURE__*/React.createElement(Button, {
    size: "lg",
    onClick: onShop
  }, "Shake it on"), /*#__PURE__*/React.createElement(Button, {
    size: "lg",
    variant: "outline",
    onClick: onShop
  }, "See all blends")), /*#__PURE__*/React.createElement(SpecStrip, {
    align: "left",
    items: ["6 INGREDIENTS", "0 BAGEL", "SHIPS IN 2 DAYS"],
    style: {
      color: "var(--poppy-100)",
      borderColor: "rgba(255,253,247,.3)",
      maxWidth: 460
    }
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      padding: "clamp(24px,3vw,48px)",
      display: "grid",
      placeItems: "center"
    }
  }, /*#__PURE__*/React.createElement(Photo, {
    shape: "arch",
    ratio: "4 / 5",
    label: "Open jar, seasoning mid-pour",
    style: {
      width: "100%",
      maxWidth: 420,
      background: "var(--sesame-300)"
    }
  })));
}
function ValueRow() {
  const items = [["leaf", "Real ingredients", "Toasted sesame, poppy, garlic, onion, kosher salt. That's it."], ["package", "Refill, don't rebuy", "Glass jar once, pouches after. 16 oz refills last months."], ["truck", "Free over $35", "Flat $5 otherwise. Two-day dispatch from Brooklyn."]];
  return /*#__PURE__*/React.createElement("section", {
    style: {
      display: "grid",
      gridTemplateColumns: "repeat(3,1fr)",
      gap: "var(--grid-gap)",
      padding: "var(--section-y) var(--gutter-inline)"
    }
  }, items.map(([icon, title, body]) => /*#__PURE__*/React.createElement(Card, {
    key: title,
    tone: "paper",
    padding: "var(--space-5)",
    style: {
      display: "flex",
      flexDirection: "column",
      gap: "var(--space-3)"
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      width: 44,
      height: 44,
      display: "grid",
      placeItems: "center",
      borderRadius: "var(--radius-pill)",
      background: "var(--garlic-100)",
      border: "var(--border-2) solid var(--border-strong)"
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: icon,
    size: 20
  })), /*#__PURE__*/React.createElement("h3", {
    style: {
      margin: 0,
      fontFamily: "var(--font-headline)",
      fontWeight: 900,
      textTransform: "uppercase",
      fontSize: "var(--type-headline-sm)",
      letterSpacing: "var(--tracking-headline)"
    }
  }, title), /*#__PURE__*/React.createElement("p", {
    style: {
      margin: 0,
      fontSize: "var(--type-body-sm)",
      color: "var(--text-muted)"
    }
  }, body))));
}
function Story() {
  return /*#__PURE__*/React.createElement("section", {
    style: {
      display: "grid",
      gridTemplateColumns: ".9fr 1.1fr",
      gap: "var(--space-7)",
      alignItems: "center",
      padding: "var(--section-y) var(--gutter-inline)",
      background: "var(--sesame-300)",
      borderTop: "var(--border-2) solid var(--border-strong)",
      borderBottom: "var(--border-2) solid var(--border-strong)"
    }
  }, /*#__PURE__*/React.createElement(Photo, {
    shape: "rounded",
    ratio: "1 / 1",
    label: "Toasting sesame, close crop"
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexDirection: "column",
      gap: "var(--space-4)"
    }
  }, /*#__PURE__*/React.createElement(SectionHeading, {
    align: "left",
    eyebrow: "Our story",
    title: "We toast it, we grind it, we jar it"
  }, "It started because a bagel shop wouldn't sell us a bag of the topping. So we made our own, in small batches, and never stopped."), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: "var(--space-2)",
      flexWrap: "wrap"
    }
  }, /*#__PURE__*/React.createElement(Tag, null, "Brooklyn, NY"), /*#__PURE__*/React.createElement(Tag, null, "Since 2019"), /*#__PURE__*/React.createElement(Tag, null, "Family run")), /*#__PURE__*/React.createElement(Button, {
    variant: "ink",
    style: {
      alignSelf: "flex-start"
    }
  }, "Read the whole thing")));
}
function Home({
  onAdd,
  onShop
}) {
  const products = [{
    name: "Everything Blend",
    price: "$12",
    claim: "The original. Zero bagel.",
    badge: "Best seller",
    tone: "blaze",
    specs: ["2.3 oz"]
  }, {
    name: "Extra Garlic",
    price: "$13",
    claim: "For people who mean it.",
    tone: "garlic",
    specs: ["2.3 oz"]
  }, {
    name: "Chile Everything",
    price: "$13",
    claim: "Blend one, plus a slow burn.",
    badge: "New",
    tone: "onion",
    specs: ["2.3 oz"]
  }, {
    name: "Refill Pouch",
    price: "$24",
    claim: "Sixteen ounces of restock.",
    tone: "scallion",
    specs: ["16 oz"]
  }];
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(Hero, {
    onShop: onShop
  }), /*#__PURE__*/React.createElement(Marquee, {
    tone: "blaze",
    items: ["Sesame + poppy + garlic", "No bagel, ever", "Small batch, big shake", "Free shipping over $35"]
  }), /*#__PURE__*/React.createElement(ValueRow, null), /*#__PURE__*/React.createElement("section", {
    style: {
      padding: "0 var(--gutter-inline) var(--section-y)",
      display: "flex",
      flexDirection: "column",
      gap: "var(--space-6)"
    }
  }, /*#__PURE__*/React.createElement(SectionHeading, {
    eyebrow: "Most shaken",
    title: "Sprinkle responsibly"
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "grid",
      gridTemplateColumns: "repeat(4,1fr)",
      gap: "var(--grid-gap)"
    }
  }, products.map(p => /*#__PURE__*/React.createElement(ProductCard, _extends({
    key: p.name
  }, p, {
    onAdd: () => onAdd(p)
  }))))), /*#__PURE__*/React.createElement(Story, null), /*#__PURE__*/React.createElement(Marquee, {
    tone: "garlic",
    items: ["Eggs", "Avocado", "Popcorn", "Tomatoes", "Cottage cheese", "Fries", "Definitely not bagels"],
    speed: 32
  }));
}
window.Home = Home;
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/storefront/Home.jsx", error: String((e && e.message) || e) }); }

// ui_kits/storefront/Product.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const {
  Button,
  Badge,
  Card,
  Photo,
  PriceTag,
  SpecStrip,
  Radio,
  QuantityStepper,
  Tabs,
  Tag,
  Icon,
  Marquee,
  SectionHeading,
  ProductCard
} = window.EBTBDesignSystem_c7b8b1;
function Product({
  product,
  onAdd,
  onShop
}) {
  const [qty, setQty] = React.useState(1);
  const [plan, setPlan] = React.useState("sub");
  const [tab, setTab] = React.useState("Ingredients");
  const copy = {
    Ingredients: "Toasted white sesame, black sesame, poppy seed, dried garlic, dried onion, kosher salt. Nothing else — no anti-caking agents, no bagel.",
    "How to use": "Eggs, avocado toast, roast vegetables, cottage cheese, popcorn, cucumbers, salmon, fries. Shake at the end of cooking so the sesame stays toasty.",
    Shipping: "Dispatched from Brooklyn within two business days. Free over $35, otherwise a flat $5. Refill pouches ship in compostable mailers."
  };
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("section", {
    style: {
      display: "grid",
      gridTemplateColumns: "1fr 1fr",
      gap: "var(--space-7)",
      padding: "var(--space-7) var(--gutter-inline)"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexDirection: "column",
      gap: "var(--space-3)"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      position: "relative",
      background: "var(--surface-blaze)",
      borderRadius: "var(--radius-xl)",
      border: "var(--border-2) solid var(--border-strong)",
      padding: "var(--space-6)"
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      position: "absolute",
      top: 16,
      left: 16,
      zIndex: 2
    }
  }, /*#__PURE__*/React.createElement(Badge, {
    tone: "paper",
    rotate: -5
  }, "No bagel, ever")), /*#__PURE__*/React.createElement(Photo, {
    shape: "circle",
    ratio: "1 / 1",
    label: "Jar, front of pack"
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "grid",
      gridTemplateColumns: "repeat(4,1fr)",
      gap: "var(--space-3)"
    }
  }, ["Lid off", "Top-down pour", "On eggs", "Back of pack"].map(l => /*#__PURE__*/React.createElement(Photo, {
    key: l,
    shape: "rounded",
    ratio: "1 / 1",
    label: l
  })))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexDirection: "column",
      gap: "var(--space-4)"
    }
  }, /*#__PURE__*/React.createElement("span", {
    className: "ebtb-label",
    style: {
      color: "var(--blaze-500)",
      letterSpacing: "var(--tracking-label-wide)"
    }
  }, "The original"), /*#__PURE__*/React.createElement("h1", {
    style: {
      margin: 0,
      fontFamily: "var(--font-display)",
      fontWeight: 400,
      fontSize: "var(--type-display-md)",
      lineHeight: "var(--leading-display)",
      letterSpacing: "var(--tracking-display)"
    }
  }, product.name), /*#__PURE__*/React.createElement(PriceTag, {
    price: product.price + ".00",
    size: "lg"
  }), /*#__PURE__*/React.createElement("p", {
    style: {
      margin: 0,
      fontSize: "var(--type-body-lg)",
      maxWidth: "46ch"
    }
  }, "The blend that started it. Toasted, ground coarse, and jarred the same week \u2014 so it still smells like something."), /*#__PURE__*/React.createElement(SpecStrip, {
    align: "left",
    items: ["2.3 OZ", "6 INGREDIENTS", "VEGAN", "KOSHER"]
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexDirection: "column",
      gap: "var(--space-3)"
    }
  }, /*#__PURE__*/React.createElement(Radio, {
    panel: true,
    name: "plan",
    label: "Subscribe & save 15%",
    description: "Every 8 weeks. Skip or cancel anytime.",
    checked: plan === "sub",
    onChange: () => setPlan("sub")
  }), /*#__PURE__*/React.createElement(Radio, {
    panel: true,
    name: "plan",
    label: "One-time purchase",
    description: "Just this jar.",
    checked: plan === "one",
    onChange: () => setPlan("one")
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: "var(--space-3)",
      alignItems: "center"
    }
  }, /*#__PURE__*/React.createElement(QuantityStepper, {
    value: qty,
    onChange: setQty
  }), /*#__PURE__*/React.createElement(Button, {
    size: "lg",
    style: {
      flex: 1
    },
    onClick: () => onAdd(product, qty)
  }, "Add to cart")), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: "var(--space-4)",
      alignItems: "center",
      color: "var(--text-muted)",
      fontSize: "var(--type-body-sm)"
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      display: "inline-flex",
      gap: 6,
      alignItems: "center"
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "truck",
    size: 16
  }), "Free over $35"), /*#__PURE__*/React.createElement("span", {
    style: {
      display: "inline-flex",
      gap: 6,
      alignItems: "center"
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "refresh-cw",
    size: 16
  }), "Refill pouches")), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexDirection: "column",
      gap: "var(--space-3)",
      marginTop: "var(--space-2)"
    }
  }, /*#__PURE__*/React.createElement(Tabs, {
    items: Object.keys(copy),
    value: tab,
    onChange: setTab
  }), /*#__PURE__*/React.createElement(Card, {
    tone: "cream",
    padding: "var(--space-5)",
    shadow: false
  }, /*#__PURE__*/React.createElement("p", {
    style: {
      margin: 0,
      fontSize: "var(--type-body-md)"
    }
  }, copy[tab]))))), /*#__PURE__*/React.createElement(Marquee, {
    tone: "onion",
    items: ["Shake it on", "Refill, don't rebuy", "Small batch, big shake"]
  }), /*#__PURE__*/React.createElement("section", {
    style: {
      padding: "var(--section-y) var(--gutter-inline)",
      display: "flex",
      flexDirection: "column",
      gap: "var(--space-5)"
    }
  }, /*#__PURE__*/React.createElement(SectionHeading, {
    align: "left",
    size: "sm",
    eyebrow: "Goes with",
    title: "Shake these too"
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "grid",
      gridTemplateColumns: "repeat(4,1fr)",
      gap: "var(--grid-gap)"
    }
  }, [{
    name: "Extra Garlic",
    price: "$13",
    tone: "garlic",
    claim: "For people who mean it.",
    specs: ["2.3 oz"]
  }, {
    name: "Chile Everything",
    price: "$13",
    tone: "onion",
    claim: "Blend one, plus a slow burn.",
    specs: ["2.3 oz"]
  }, {
    name: "Refill Pouch",
    price: "$24",
    tone: "scallion",
    claim: "Sixteen ounces of restock.",
    specs: ["16 oz"]
  }, {
    name: "Shaker Jar",
    price: "$9",
    tone: "cream",
    claim: "Glass, cork lid, dishwasher-safe.",
    specs: ["Gear"]
  }].map(p => /*#__PURE__*/React.createElement(ProductCard, _extends({
    key: p.name
  }, p, {
    onAdd: () => onAdd(p, 1)
  }))))));
}
window.Product = Product;
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/storefront/Product.jsx", error: String((e && e.message) || e) }); }

__ds_ns.CartLine = __ds_scope.CartLine;

__ds_ns.PriceTag = __ds_scope.PriceTag;

__ds_ns.ProductCard = __ds_scope.ProductCard;

__ds_ns.SpecStrip = __ds_scope.SpecStrip;

__ds_ns.Badge = __ds_scope.Badge;

__ds_ns.Button = __ds_scope.Button;

__ds_ns.Card = __ds_scope.Card;

__ds_ns.Icon = __ds_scope.Icon;

__ds_ns.IconButton = __ds_scope.IconButton;

__ds_ns.Marquee = __ds_scope.Marquee;

__ds_ns.Photo = __ds_scope.Photo;

__ds_ns.SectionHeading = __ds_scope.SectionHeading;

__ds_ns.Tag = __ds_scope.Tag;

__ds_ns.Dialog = __ds_scope.Dialog;

__ds_ns.Toast = __ds_scope.Toast;

__ds_ns.Tooltip = __ds_scope.Tooltip;

__ds_ns.Checkbox = __ds_scope.Checkbox;

__ds_ns.Input = __ds_scope.Input;

__ds_ns.QuantityStepper = __ds_scope.QuantityStepper;

__ds_ns.Radio = __ds_scope.Radio;

__ds_ns.Select = __ds_scope.Select;

__ds_ns.Switch = __ds_scope.Switch;

__ds_ns.Footer = __ds_scope.Footer;

__ds_ns.NavBar = __ds_scope.NavBar;

__ds_ns.Tabs = __ds_scope.Tabs;

})();
