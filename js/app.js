(() => {
  "use strict";
  function e(e) {
    this.type = e;
  }
  (e.prototype.init = function () {
    const e = this;
    (this.оbjects = []),
      (this.daClassname = "_dynamic_adapt_"),
      (this.nodes = document.querySelectorAll("[data-da]"));
    for (let e = 0; e < this.nodes.length; e++) {
      const t = this.nodes[e],
        s = t.dataset.da.trim().split(","),
        i = {};
      (i.element = t),
        (i.parent = t.parentNode),
        (i.destination = document.querySelector(s[0].trim())),
        (i.breakpoint = s[1] ? s[1].trim() : "767"),
        (i.place = s[2] ? s[2].trim() : "last"),
        (i.index = this.indexInParent(i.parent, i.element)),
        this.оbjects.push(i);
    }
    this.arraySort(this.оbjects),
      (this.mediaQueries = Array.prototype.map.call(
        this.оbjects,
        function (e) {
          return (
            "(" + this.type + "-width: " + e.breakpoint + "px)," + e.breakpoint
          );
        },
        this,
      )),
      (this.mediaQueries = Array.prototype.filter.call(
        this.mediaQueries,
        function (e, t, s) {
          return Array.prototype.indexOf.call(s, e) === t;
        },
      ));
    for (let t = 0; t < this.mediaQueries.length; t++) {
      const s = this.mediaQueries[t],
        i = String.prototype.split.call(s, ","),
        a = window.matchMedia(i[0]),
        n = i[1],
        r = Array.prototype.filter.call(this.оbjects, function (e) {
          return e.breakpoint === n;
        });
      a.addListener(function () {
        e.mediaHandler(a, r);
      }),
        this.mediaHandler(a, r);
    }
  }),
    (e.prototype.mediaHandler = function (e, t) {
      if (e.matches)
        for (let e = 0; e < t.length; e++) {
          const s = t[e];
          (s.index = this.indexInParent(s.parent, s.element)),
            this.moveTo(s.place, s.element, s.destination);
        }
      else
        for (let e = t.length - 1; e >= 0; e--) {
          const s = t[e];
          s.element.classList.contains(this.daClassname) &&
            this.moveBack(s.parent, s.element, s.index);
        }
    }),
    (e.prototype.moveTo = function (e, t, s) {
      t.classList.add(this.daClassname),
        "last" === e || e >= s.children.length
          ? s.insertAdjacentElement("beforeend", t)
          : "first" !== e
            ? s.children[e].insertAdjacentElement("beforebegin", t)
            : s.insertAdjacentElement("afterbegin", t);
    }),
    (e.prototype.moveBack = function (e, t, s) {
      t.classList.remove(this.daClassname),
        void 0 !== e.children[s]
          ? e.children[s].insertAdjacentElement("beforebegin", t)
          : e.insertAdjacentElement("beforeend", t);
    }),
    (e.prototype.indexInParent = function (e, t) {
      const s = Array.prototype.slice.call(e.children);
      return Array.prototype.indexOf.call(s, t);
    }),
    (e.prototype.arraySort = function (e) {
      "min" === this.type
        ? Array.prototype.sort.call(e, function (e, t) {
            return e.breakpoint === t.breakpoint
              ? e.place === t.place
                ? 0
                : "first" === e.place || "last" === t.place
                  ? -1
                  : "last" === e.place || "first" === t.place
                    ? 1
                    : e.place - t.place
              : e.breakpoint - t.breakpoint;
          })
        : Array.prototype.sort.call(e, function (e, t) {
            return e.breakpoint === t.breakpoint
              ? e.place === t.place
                ? 0
                : "first" === e.place || "last" === t.place
                  ? 1
                  : "last" === e.place || "first" === t.place
                    ? -1
                    : t.place - e.place
              : t.breakpoint - e.breakpoint;
          });
    });
  new e("max").init();
  class t {
    constructor(e) {
      let t = {
        logging: !0,
        init: !0,
        attributeOpenButton: "data-popup",
        attributeCloseButton: "data-close",
        fixElementSelector: "[data-lp]",
        youtubeAttribute: "data-youtube",
        youtubePlaceAttribute: "data-youtube-place",
        setAutoplayYoutube: !0,
        classes: {
          popup: "popup",
          popupContent: "popup__content",
          popupActive: "popup_show",
          bodyActive: "popup-show",
        },
        focusCatch: !0,
        closeEsc: !0,
        bodyLock: !0,
        bodyLockDelay: 500,
        hashSettings: { location: !0, goHash: !0 },
        on: {
          beforeOpen: function () {},
          afterOpen: function () {},
          beforeClose: function () {},
          afterClose: function () {},
        },
      };
      (this.isOpen = !1),
        (this.targetOpen = { selector: !1, element: !1 }),
        (this.previousOpen = { selector: !1, element: !1 }),
        (this.lastClosed = { selector: !1, element: !1 }),
        (this._dataValue = !1),
        (this.hash = !1),
        (this._reopen = !1),
        (this._selectorOpen = !1),
        (this.lastFocusEl = !1),
        (this._focusEl = [
          "a[href]",
          'input:not([disabled]):not([type="hidden"]):not([aria-hidden])',
          "button:not([disabled]):not([aria-hidden])",
          "select:not([disabled]):not([aria-hidden])",
          "textarea:not([disabled]):not([aria-hidden])",
          "area[href]",
          "iframe",
          "object",
          "embed",
          "[contenteditable]",
          '[tabindex]:not([tabindex^="-"])',
        ]),
        (this.options = {
          ...t,
          ...e,
          classes: { ...t.classes, ...e?.classes },
          hashSettings: { ...t.hashSettings, ...e?.hashSettings },
          on: { ...t.on, ...e?.on },
        }),
        this.options.init && this.initPopups();
    }
    initPopups() {
      this.popupLogging("Проснулся"), this.eventsPopup();
    }
    eventsPopup() {
      document.addEventListener(
        "click",
        function (e) {
          const t = e.target.closest(`[${this.options.attributeOpenButton}]`);
          if (t)
            return (
              e.preventDefault(),
              (this._dataValue = t.getAttribute(
                this.options.attributeOpenButton,
              )
                ? t.getAttribute(this.options.attributeOpenButton)
                : "error"),
              "error" !== this._dataValue
                ? (this.isOpen || (this.lastFocusEl = t),
                  (this.targetOpen.selector = `${this._dataValue}`),
                  (this._selectorOpen = !0),
                  void this.open())
                : void this.popupLogging(
                    `Ой ой, не заполнен атрибут у ${t.classList}`,
                  )
            );
          return e.target.closest(`[${this.options.attributeCloseButton}]`) ||
            (!e.target.closest(`.${this.options.classes.popupContent}`) &&
              this.isOpen)
            ? (e.preventDefault(), void this.close())
            : void 0;
        }.bind(this),
      ),
        document.addEventListener(
          "keydown",
          function (e) {
            if (
              this.options.closeEsc &&
              27 == e.which &&
              "Escape" === e.code &&
              this.isOpen
            )
              return e.preventDefault(), void this.close();
            this.options.focusCatch &&
              9 == e.which &&
              this.isOpen &&
              this._focusCatch(e);
          }.bind(this),
        ),
        document.querySelector("form[data-ajax],form[data-dev]") &&
          document.addEventListener(
            "formSent",
            function (e) {
              const t = e.detail.form.dataset.popupMessage;
              t && this.open(t);
            }.bind(this),
          ),
        this.options.hashSettings.goHash &&
          (window.addEventListener(
            "hashchange",
            function () {
              window.location.hash
                ? this._openToHash()
                : this.close(this.targetOpen.selector);
            }.bind(this),
          ),
          window.addEventListener(
            "load",
            function () {
              window.location.hash && this._openToHash();
            }.bind(this),
          ));
    }
    open(e) {
      if (
        (e &&
          "string" == typeof e &&
          "" !== e.trim() &&
          ((this.targetOpen.selector = e), (this._selectorOpen = !0)),
        this.isOpen && ((this._reopen = !0), this.close()),
        this._selectorOpen ||
          (this.targetOpen.selector = this.lastClosed.selector),
        this._reopen || (this.previousActiveElement = document.activeElement),
        (this.targetOpen.element = document.querySelector(
          this.targetOpen.selector,
        )),
        this.targetOpen.element)
      ) {
        if (
          this.targetOpen.element.hasAttribute(this.options.youtubeAttribute)
        ) {
          const e = `https://www.youtube.com/embed/${this.targetOpen.element.getAttribute(
              this.options.youtubeAttribute,
            )}?rel=0&showinfo=0&autoplay=1`,
            t = document.createElement("iframe");
          t.setAttribute("allowfullscreen", "");
          const s = this.options.setAutoplayYoutube ? "autoplay;" : "";
          t.setAttribute("allow", `${s}; encrypted-media`),
            t.setAttribute("src", e),
            this.targetOpen.element.querySelector(
              `[${this.options.youtubePlaceAttribute}]`,
            ) &&
              this.targetOpen.element
                .querySelector(`[${this.options.youtubePlaceAttribute}]`)
                .appendChild(t);
        }
        this.options.hashSettings.location &&
          (this._getHash(), this._setHash()),
          this.options.on.beforeOpen(this),
          this.targetOpen.element.classList.add(
            this.options.classes.popupActive,
          ),
          document.body.classList.add(this.options.classes.bodyActive),
          this._reopen ? (this._reopen = !1) : l(),
          this.targetOpen.element.setAttribute("aria-hidden", "false"),
          (this.previousOpen.selector = this.targetOpen.selector),
          (this.previousOpen.element = this.targetOpen.element),
          (this._selectorOpen = !1),
          (this.isOpen = !0),
          setTimeout(() => {
            this._focusTrap();
          }, 50),
          document.dispatchEvent(
            new CustomEvent("afterPopupOpen", { detail: { popup: this } }),
          ),
          this.popupLogging("Открыл попап");
      } else
        this.popupLogging(
          "Ой ой, такого попапа нет. Проверьте корректность ввода. ",
        );
    }
    close(e) {
      e &&
        "string" == typeof e &&
        "" !== e.trim() &&
        (this.previousOpen.selector = e),
        this.isOpen &&
          r &&
          (this.options.on.beforeClose(this),
          this.targetOpen.element.hasAttribute(this.options.youtubeAttribute) &&
            this.targetOpen.element.querySelector(
              `[${this.options.youtubePlaceAttribute}]`,
            ) &&
            (this.targetOpen.element.querySelector(
              `[${this.options.youtubePlaceAttribute}]`,
            ).innerHTML = ""),
          this.previousOpen.element.classList.remove(
            this.options.classes.popupActive,
          ),
          this.previousOpen.element.setAttribute("aria-hidden", "true"),
          this._reopen ||
            (document.body.classList.remove(this.options.classes.bodyActive),
            l(),
            (this.isOpen = !1)),
          this._removeHash(),
          this._selectorOpen &&
            ((this.lastClosed.selector = this.previousOpen.selector),
            (this.lastClosed.element = this.previousOpen.element)),
          this.options.on.afterClose(this),
          setTimeout(() => {
            this._focusTrap();
          }, 50),
          this.popupLogging("Закрыл попап"));
    }
    _getHash() {
      this.options.hashSettings.location &&
        (this.hash = this.targetOpen.selector.includes("#")
          ? this.targetOpen.selector
          : this.targetOpen.selector.replace(".", "#"));
    }
    _openToHash() {
      let e = document.querySelector(
        `.${window.location.hash.replace("#", "")}`,
      )
        ? `.${window.location.hash.replace("#", "")}`
        : document.querySelector(`${window.location.hash}`)
          ? `${window.location.hash}`
          : null;
      document.querySelector(`[${this.options.attributeOpenButton}="${e}"]`) &&
        e &&
        this.open(e);
    }
    _setHash() {
      history.pushState("", "", this.hash);
    }
    _removeHash() {
      history.pushState("", "", window.location.href.split("#")[0]);
    }
    _focusCatch(e) {
      const t = this.targetOpen.element.querySelectorAll(this._focusEl),
        s = Array.prototype.slice.call(t),
        i = s.indexOf(document.activeElement);
      e.shiftKey && 0 === i && (s[s.length - 1].focus(), e.preventDefault()),
        e.shiftKey || i !== s.length - 1 || (s[0].focus(), e.preventDefault());
    }
    _focusTrap() {
      const e = this.previousOpen.element.querySelectorAll(this._focusEl);
      !this.isOpen && this.lastFocusEl
        ? this.lastFocusEl.focus()
        : e[0].focus();
    }
    popupLogging(e) {
      this.options.logging && c(`[Попапос]: ${e}`);
    }
  }
  let s = {
    Android: function () {
      return navigator.userAgent.match(/Android/i);
    },
    BlackBerry: function () {
      return navigator.userAgent.match(/BlackBerry/i);
    },
    iOS: function () {
      return navigator.userAgent.match(/iPhone|iPad|iPod/i);
    },
    Opera: function () {
      return navigator.userAgent.match(/Opera Mini/i);
    },
    Windows: function () {
      return navigator.userAgent.match(/IEMobile/i);
    },
    any: function () {
      return (
        s.Android() || s.BlackBerry() || s.iOS() || s.Opera() || s.Windows()
      );
    },
  };
  let i = (e, t = 500, s = 0) => {
      e.classList.contains("_slide") ||
        (e.classList.add("_slide"),
        (e.style.transitionProperty = "height, margin, padding"),
        (e.style.transitionDuration = t + "ms"),
        (e.style.height = `${e.offsetHeight}px`),
        e.offsetHeight,
        (e.style.overflow = "hidden"),
        (e.style.height = s ? `${s}px` : "0px"),
        (e.style.paddingTop = 0),
        (e.style.paddingBottom = 0),
        (e.style.marginTop = 0),
        (e.style.marginBottom = 0),
        window.setTimeout(() => {
          (e.hidden = !s),
            !s && e.style.removeProperty("height"),
            e.style.removeProperty("padding-top"),
            e.style.removeProperty("padding-bottom"),
            e.style.removeProperty("margin-top"),
            e.style.removeProperty("margin-bottom"),
            !s && e.style.removeProperty("overflow"),
            e.style.removeProperty("transition-duration"),
            e.style.removeProperty("transition-property"),
            e.classList.remove("_slide");
        }, t));
    },
    a = (e, t = 500, s = 0) => {
      if (!e.classList.contains("_slide")) {
        e.classList.add("_slide"),
          (e.hidden = !e.hidden && null),
          s && e.style.removeProperty("height");
        let i = e.offsetHeight;
        (e.style.overflow = "hidden"),
          (e.style.height = s ? `${s}px` : "0px"),
          (e.style.paddingTop = 0),
          (e.style.paddingBottom = 0),
          (e.style.marginTop = 0),
          (e.style.marginBottom = 0),
          e.offsetHeight,
          (e.style.transitionProperty = "height, margin, padding"),
          (e.style.transitionDuration = t + "ms"),
          (e.style.height = i + "px"),
          e.style.removeProperty("padding-top"),
          e.style.removeProperty("padding-bottom"),
          e.style.removeProperty("margin-top"),
          e.style.removeProperty("margin-bottom"),
          window.setTimeout(() => {
            e.style.removeProperty("height"),
              e.style.removeProperty("overflow"),
              e.style.removeProperty("transition-duration"),
              e.style.removeProperty("transition-property"),
              e.classList.remove("_slide");
          }, t);
      }
    },
    n = (e, t = 500) => (e.hidden ? a(e, t) : i(e, t)),
    r = !0,
    l = (e = 500) => {
      document.documentElement.classList.contains("lock") ? o(e) : d(e);
    },
    o = (e = 500) => {
      let t = document.querySelector("body");
      if (r) {
        let s = document.querySelectorAll("[data-lp]");
        setTimeout(() => {
          for (let e = 0; e < s.length; e++) {
            s[e].style.paddingRight = "0px";
          }
          (t.style.paddingRight = "0px"),
            document.documentElement.classList.remove("lock");
        }, e),
          (r = !1),
          setTimeout(function () {
            r = !0;
          }, e);
      }
    },
    d = (e = 500) => {
      let t = document.querySelector("body");
      if (r) {
        let s = document.querySelectorAll("[data-lp]");
        for (let e = 0; e < s.length; e++) {
          s[e].style.paddingRight =
            window.innerWidth -
            document.querySelector(".wrapper").offsetWidth +
            "px";
        }
        (t.style.paddingRight =
          window.innerWidth -
          document.querySelector(".wrapper").offsetWidth +
          "px"),
          document.documentElement.classList.add("lock"),
          (r = !1),
          setTimeout(function () {
            r = !0;
          }, e);
      }
    };
  function c(e) {
    setTimeout(() => {
      window.FLS && console.log(e);
    }, 0);
  }
  function p(e) {
    return e.filter(function (e, t, s) {
      return s.indexOf(e) === t;
    });
  }
  function u(e, t) {
    const s = Array.from(e).filter(function (e, s, i) {
      if (e.dataset[t]) return e.dataset[t].split(",")[0];
    });
    if (s.length) {
      const e = [];
      s.forEach((s) => {
        const i = {},
          a = s.dataset[t].split(",");
        (i.value = a[0]),
          (i.type = a[1] ? a[1].trim() : "max"),
          (i.item = s),
          e.push(i);
      });
      let i = e.map(function (e) {
        return (
          "(" + e.type + "-width: " + e.value + "px)," + e.value + "," + e.type
        );
      });
      i = p(i);
      const a = [];
      if (i.length)
        return (
          i.forEach((t) => {
            const s = t.split(","),
              i = s[1],
              n = s[2],
              r = window.matchMedia(s[0]),
              l = e.filter(function (e) {
                if (e.value === i && e.type === n) return !0;
              });
            a.push({ itemsArray: l, matchMedia: r });
          }),
          a
        );
    }
  }
  let h = (e, t = !1, s = 500, i = 0) => {
    const a = document.querySelector(e);
    if (a) {
      let n = "",
        r = 0;
      t &&
        ((n = "header.header"), (r = document.querySelector(n).offsetHeight));
      let l = {
        speedAsDuration: !0,
        speed: s,
        header: n,
        offset: i,
        easing: "easeOutQuad",
      };
      if (
        (document.documentElement.classList.contains("menu-open") &&
          (o(), document.documentElement.classList.remove("menu-open")),
        "undefined" != typeof SmoothScroll)
      )
        new SmoothScroll().animateScroll(a, "", l);
      else {
        let e = a.getBoundingClientRect().top + scrollY;
        window.scrollTo({ top: r ? e - r : e, behavior: "smooth" });
      }
      c(`[gotoBlock]: Юхуу...едем к ${e}`);
    } else c(`[gotoBlock]: Ой ой..Такого блока нет на странице: ${e}`);
  };
  class m {
    constructor(e, t = null) {
      if (
        ((this.config = Object.assign({ init: !0, logging: !0 }, e)),
        (this.selectClasses = {
          classSelect: "select",
          classSelectBody: "select__body",
          classSelectTitle: "select__title",
          classSelectValue: "select__value",
          classSelectLabel: "select__label",
          classSelectInput: "select__input",
          classSelectText: "select__text",
          classSelectLink: "select__link",
          classSelectOptions: "select__options",
          classSelectOptionsScroll: "select__scroll",
          classSelectOption: "select__option",
          classSelectContent: "select__content",
          classSelectRow: "select__row",
          classSelectData: "select__asset",
          classSelectDisabled: "_select-disabled",
          classSelectTag: "_select-tag",
          classSelectOpen: "_select-open",
          classSelectActive: "_select-active",
          classSelectFocus: "_select-focus",
          classSelectMultiple: "_select-multiple",
          classSelectCheckBox: "_select-checkbox",
          classSelectOptionSelected: "_select-selected",
        }),
        (this._this = this),
        this.config.init)
      ) {
        const e = t
          ? document.querySelectorAll(t)
          : document.querySelectorAll("select");
        e.length
          ? (this.selectsInit(e),
            this.setLogging(`Проснулся, построил селектов: (${e.length})`))
          : this.setLogging("Сплю, нет ни одного select zzZZZzZZz");
      }
    }
    getSelectClass(e) {
      return `.${e}`;
    }
    getSelectElement(e, t) {
      return {
        originalSelect: e.querySelector("select"),
        selectElement: e.querySelector(this.getSelectClass(t)),
      };
    }
    selectsInit(e) {
      e.forEach((e, t) => {
        this.selectInit(e, t + 1);
      }),
        document.addEventListener(
          "click",
          function (e) {
            this.selectsActions(e);
          }.bind(this),
        ),
        document.addEventListener(
          "keydown",
          function (e) {
            this.selectsActions(e);
          }.bind(this),
        ),
        document.addEventListener(
          "focusin",
          function (e) {
            this.selectsActions(e);
          }.bind(this),
        ),
        document.addEventListener(
          "focusout",
          function (e) {
            this.selectsActions(e);
          }.bind(this),
        );
    }
    selectInit(e, t) {
      const s = this;
      let i = document.createElement("div");
      if (
        (i.classList.add(this.selectClasses.classSelect),
        e.parentNode.insertBefore(i, e),
        i.appendChild(e),
        (e.hidden = !0),
        t && (e.dataset.id = t),
        i.insertAdjacentHTML(
          "beforeend",
          `<div class="${this.selectClasses.classSelectBody}"><div hidden class="${this.selectClasses.classSelectOptions}"></div></div>`,
        ),
        this.selectBuild(e),
        this.getSelectPlaceholder(e) &&
          ((e.dataset.placeholder = this.getSelectPlaceholder(e).value),
          this.getSelectPlaceholder(e).label.show))
      ) {
        this.getSelectElement(
          i,
          this.selectClasses.classSelectTitle,
        ).selectElement.insertAdjacentHTML(
          "afterbegin",
          `<span class="${this.selectClasses.classSelectLabel}">${
            this.getSelectPlaceholder(e).label.text
              ? this.getSelectPlaceholder(e).label.text
              : this.getSelectPlaceholder(e).value
          }</span>`,
        );
      }
      (e.dataset.speed = e.dataset.speed ? e.dataset.speed : "150"),
        e.addEventListener("change", function (e) {
          s.selectChange(e);
        });
    }
    selectBuild(e) {
      const t = e.parentElement;
      (t.dataset.id = e.dataset.id),
        t.classList.add(
          e.getAttribute("class") ? `select_${e.getAttribute("class")}` : "",
        ),
        e.multiple
          ? t.classList.add(this.selectClasses.classSelectMultiple)
          : t.classList.remove(this.selectClasses.classSelectMultiple),
        e.hasAttribute("data-checkbox") && e.multiple
          ? t.classList.add(this.selectClasses.classSelectCheckBox)
          : t.classList.remove(this.selectClasses.classSelectCheckBox),
        this.setSelectTitleValue(t, e),
        this.setOptions(t, e),
        e.hasAttribute("data-search") && this.searchActions(t),
        e.hasAttribute("data-open") && this.selectAction(t),
        this.selectDisabled(t, e);
    }
    selectsActions(e) {
      const t = e.target,
        s = e.type;
      if (
        t.closest(this.getSelectClass(this.selectClasses.classSelect)) ||
        t.closest(this.getSelectClass(this.selectClasses.classSelectTag))
      ) {
        const i = t.closest(".select")
            ? t.closest(".select")
            : document.querySelector(
                `.${this.selectClasses.classSelect}[data-id="${
                  t.closest(
                    this.getSelectClass(this.selectClasses.classSelectTag),
                  ).dataset.selectId
                }"]`,
              ),
          a = this.getSelectElement(i).originalSelect;
        if ("click" === s) {
          if (!a.disabled)
            if (
              t.closest(this.getSelectClass(this.selectClasses.classSelectTag))
            ) {
              const e = t.closest(
                  this.getSelectClass(this.selectClasses.classSelectTag),
                ),
                s = document.querySelector(
                  `.${this.selectClasses.classSelect}[data-id="${e.dataset.selectId}"] .select__option[data-value="${e.dataset.value}"]`,
                );
              this.optionAction(i, a, s);
            } else if (
              t.closest(
                this.getSelectClass(this.selectClasses.classSelectTitle),
              )
            )
              this.selectAction(i);
            else if (
              t.closest(
                this.getSelectClass(this.selectClasses.classSelectOption),
              )
            ) {
              const e = t.closest(
                this.getSelectClass(this.selectClasses.classSelectOption),
              );
              this.optionAction(i, a, e);
            }
        } else
          "focusin" === s || "focusout" === s
            ? t.closest(this.getSelectClass(this.selectClasses.classSelect)) &&
              ("focusin" === s
                ? i.classList.add(this.selectClasses.classSelectFocus)
                : i.classList.remove(this.selectClasses.classSelectFocus))
            : "keydown" === s && "Escape" === e.code && this.selectsСlose();
      } else this.selectsСlose();
    }
    selectsСlose() {
      const e = document.querySelectorAll(
        `${this.getSelectClass(
          this.selectClasses.classSelect,
        )}${this.getSelectClass(this.selectClasses.classSelectOpen)}`,
      );
      e.length &&
        e.forEach((e) => {
          this.selectAction(e);
        });
    }
    selectAction(e) {
      const t = this.getSelectElement(e).originalSelect,
        s = this.getSelectElement(
          e,
          this.selectClasses.classSelectOptions,
        ).selectElement;
      s.classList.contains("_slide") ||
        (e.classList.toggle(this.selectClasses.classSelectOpen),
        n(s, t.dataset.speed));
    }
    setSelectTitleValue(e, t) {
      const s = this.getSelectElement(
          e,
          this.selectClasses.classSelectBody,
        ).selectElement,
        i = this.getSelectElement(
          e,
          this.selectClasses.classSelectTitle,
        ).selectElement;
      i && i.remove(),
        s.insertAdjacentHTML("afterbegin", this.getSelectTitleValue(e, t));
    }
    getSelectTitleValue(e, t) {
      let s = this.getSelectedOptionsData(t, 2).html;
      if (
        (t.multiple &&
          t.hasAttribute("data-tags") &&
          ((s = this.getSelectedOptionsData(t)
            .elements.map(
              (t) =>
                `<span role="button" data-select-id="${
                  e.dataset.id
                }" data-value="${
                  t.value
                }" class="_select-tag">${this.getSelectElementContent(
                  t,
                )}</span>`,
            )
            .join("")),
          t.dataset.tags &&
            document.querySelector(t.dataset.tags) &&
            ((document.querySelector(t.dataset.tags).innerHTML = s),
            t.hasAttribute("data-search") && (s = !1))),
        (s = s.length ? s : t.dataset.placeholder),
        this.getSelectedOptionsData(t).values.length
          ? e.classList.add(this.selectClasses.classSelectActive)
          : e.classList.remove(this.selectClasses.classSelectActive),
        t.hasAttribute("data-search"))
      )
        return `<div class="${this.selectClasses.classSelectTitle}"><span class="${this.selectClasses.classSelectValue}"><input autocomplete="off" type="text" placeholder="${s}" data-placeholder="${s}" class="${this.selectClasses.classSelectInput}"></span></div>`;
      {
        const e =
          this.getSelectedOptionsData(t).elements.length &&
          this.getSelectedOptionsData(t).elements[0].dataset.class
            ? ` ${this.getSelectedOptionsData(t).elements[0].dataset.class}`
            : "";
        return `<button type="button" class="${this.selectClasses.classSelectTitle}"><span class="${this.selectClasses.classSelectValue}"><span class="${this.selectClasses.classSelectContent}${e}">${s}</span></span></button>`;
      }
    }
    getSelectElementContent(e) {
      const t = e.dataset.asset ? `${e.dataset.asset}` : "",
        s = t.indexOf("img") >= 0 ? `<img src="${t}" alt="">` : t;
      let i = "";
      return (
        (i += t ? `<span class="${this.selectClasses.classSelectRow}">` : ""),
        (i += t ? `<span class="${this.selectClasses.classSelectData}">` : ""),
        (i += t ? s : ""),
        (i += t ? "</span>" : ""),
        (i += t ? `<span class="${this.selectClasses.classSelectText}">` : ""),
        (i += e.textContent),
        (i += t ? "</span>" : ""),
        (i += t ? "</span>" : ""),
        i
      );
    }
    getSelectPlaceholder(e) {
      const t = Array.from(e.options).find((e) => !e.value);
      if (t)
        return {
          value: t.textContent,
          show: t.hasAttribute("data-show"),
          label: { show: t.hasAttribute("data-label"), text: t.dataset.label },
        };
    }
    getSelectedOptionsData(e, t) {
      let s = [];
      return (
        e.multiple
          ? (s = Array.from(e.options)
              .filter((e) => e.value)
              .filter((e) => e.selected))
          : s.push(e.options[e.selectedIndex]),
        {
          elements: s.map((e) => e),
          values: s.filter((e) => e.value).map((e) => e.value),
          html: s.map((e) => this.getSelectElementContent(e)),
        }
      );
    }
    getOptions(e) {
      let t = e.hasAttribute("data-scroll") ? "data-simplebar" : "",
        s = e.dataset.scroll ? `style="max-height:${e.dataset.scroll}px"` : "",
        i = Array.from(e.options);
      if (i.length > 0) {
        let a = "";
        return (
          ((this.getSelectPlaceholder(e) &&
            !this.getSelectPlaceholder(e).show) ||
            e.multiple) &&
            (i = i.filter((e) => e.value)),
          (a += t
            ? `<div ${t} ${s} class="${this.selectClasses.classSelectOptionsScroll}">`
            : ""),
          i.forEach((t) => {
            a += this.getOption(t, e);
          }),
          (a += t ? "</div>" : ""),
          a
        );
      }
    }
    getOption(e, t) {
      const s =
          e.selected && t.multiple
            ? ` ${this.selectClasses.classSelectOptionSelected}`
            : "",
        i = e.selected && !t.hasAttribute("data-show-selected") ? "hidden" : "",
        a = e.dataset.class ? ` ${e.dataset.class}` : "",
        n = !!e.dataset.href && e.dataset.href,
        r = e.hasAttribute("data-href-blank") ? 'target="_blank"' : "";
      let l = "";
      return (
        (l += n
          ? `<a ${r} ${i} href="${n}" data-value="${e.value}" class="${this.selectClasses.classSelectOption}${a}${s}">`
          : `<button ${i} class="${this.selectClasses.classSelectOption}${a}${s}" data-value="${e.value}" type="button">`),
        (l += this.getSelectElementContent(e)),
        (l += n ? "</a>" : "</button>"),
        l
      );
    }
    setOptions(e, t) {
      this.getSelectElement(
        e,
        this.selectClasses.classSelectOptions,
      ).selectElement.innerHTML = this.getOptions(t);
    }
    optionAction(e, t, s) {
      if (t.multiple) {
        s.classList.toggle(this.selectClasses.classSelectOptionSelected);
        this.getSelectedOptionsData(t).elements.forEach((e) => {
          e.removeAttribute("selected");
        });
        e.querySelectorAll(
          this.getSelectClass(this.selectClasses.classSelectOptionSelected),
        ).forEach((e) => {
          t.querySelector(`option[value="${e.dataset.value}"]`).setAttribute(
            "selected",
            "selected",
          );
        });
      } else
        t.hasAttribute("data-show-selected") ||
          (e.querySelector(
            `${this.getSelectClass(
              this.selectClasses.classSelectOption,
            )}[hidden]`,
          ) &&
            (e.querySelector(
              `${this.getSelectClass(
                this.selectClasses.classSelectOption,
              )}[hidden]`,
            ).hidden = !1),
          (s.hidden = !0)),
          (t.value = s.hasAttribute("data-value")
            ? s.dataset.value
            : s.textContent),
          this.selectAction(e);
      this.setSelectTitleValue(e, t), this.setSelectChange(t);
    }
    selectChange(e) {
      const t = e.target;
      this.selectBuild(t), this.setSelectChange(t);
    }
    setSelectChange(e) {
      if (
        (e.hasAttribute("data-validate") && g.validateInput(e),
        e.hasAttribute("data-submit") && e.value)
      ) {
        let t = document.createElement("button");
        (t.type = "submit"), e.closest("form").append(t), t.click(), t.remove();
      }
      const t = e.parentElement;
      this.selectCallback(t, e);
    }
    selectDisabled(e, t) {
      t.disabled
        ? (e.classList.add(this.selectClasses.classSelectDisabled),
          (this.getSelectElement(
            e,
            this.selectClasses.classSelectTitle,
          ).selectElement.disabled = !0))
        : (e.classList.remove(this.selectClasses.classSelectDisabled),
          (this.getSelectElement(
            e,
            this.selectClasses.classSelectTitle,
          ).selectElement.disabled = !1));
    }
    searchActions(e) {
      this.getSelectElement(e).originalSelect;
      const t = this.getSelectElement(
          e,
          this.selectClasses.classSelectInput,
        ).selectElement,
        s = this.getSelectElement(
          e,
          this.selectClasses.classSelectOptions,
        ).selectElement,
        i = s.querySelectorAll(`.${this.selectClasses.classSelectOption}`),
        a = this;
      t.addEventListener("input", function () {
        i.forEach((e) => {
          e.textContent.toUpperCase().indexOf(t.value.toUpperCase()) >= 0
            ? (e.hidden = !1)
            : (e.hidden = !0);
        }),
          !0 === s.hidden && a.selectAction(e);
      });
    }
    selectCallback(e, t) {
      document.dispatchEvent(
        new CustomEvent("selectCallback", { detail: { select: t } }),
      );
    }
    setLogging(e) {
      this.config.logging && c(`[select]: ${e}`);
    }
  }
  const f = { inputMaskModule: null, selectModule: null };
  let g = {
    getErrors(e) {
      let t = 0,
        s = e.querySelectorAll("*[data-required]");
      return (
        s.length &&
          s.forEach((e) => {
            (null === e.offsetParent && "SELECT" !== e.tagName) ||
              e.disabled ||
              (t += this.validateInput(e));
          }),
        t
      );
    },
    validateInput(e) {
      let t = 0;
      return (
        "email" === e.dataset.required
          ? ((e.value = e.value.replace(" ", "")),
            this.emailTest(e) ? (this.addError(e), t++) : this.removeError(e))
          : ("checkbox" !== e.type || e.checked) && e.value
            ? this.removeError(e)
            : (this.addError(e), t++),
        t
      );
    },
    addError(e) {
      e.classList.add("_form-error"),
        e.parentElement.classList.add("_form-error");
      let t = e.parentElement.querySelector(".form__error");
      t && e.parentElement.removeChild(t),
        e.dataset.error &&
          e.parentElement.insertAdjacentHTML(
            "beforeend",
            `<div class="form__error">${e.dataset.error}</div>`,
          );
    },
    removeError(e) {
      e.classList.remove("_form-error"),
        e.parentElement.classList.remove("_form-error"),
        e.parentElement.querySelector(".form__error") &&
          e.parentElement.removeChild(
            e.parentElement.querySelector(".form__error"),
          );
    },
    formClean(e) {
      e.reset(),
        setTimeout(() => {
          let t = e.querySelectorAll("input,textarea");
          for (let e = 0; e < t.length; e++) {
            const s = t[e];
            s.parentElement.classList.remove("_form-focus"),
              s.classList.remove("_form-focus"),
              g.removeError(s),
              (s.value = s.dataset.placeholder);
          }
          let s = e.querySelectorAll(".checkbox__input");
          if (s.length > 0)
            for (let e = 0; e < s.length; e++) {
              s[e].checked = !1;
            }
          if (f.selectModule) {
            let t = e.querySelectorAll(".select");
            if (t.length)
              for (let e = 0; e < t.length; e++) {
                const s = t[e].querySelector("select");
                f.selectModule.selectBuild(s);
              }
          }
        }, 0);
    },
    emailTest: (e) =>
      !/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,8})+$/.test(e.value),
  };
  function v(e) {
    return (
      null !== e &&
      "object" == typeof e &&
      "constructor" in e &&
      e.constructor === Object
    );
  }
  function S(e, t) {
    void 0 === e && (e = {}),
      void 0 === t && (t = {}),
      Object.keys(t).forEach((s) => {
        void 0 === e[s]
          ? (e[s] = t[s])
          : v(t[s]) && v(e[s]) && Object.keys(t[s]).length > 0 && S(e[s], t[s]);
      });
  }
  const w = {
    body: {},
    addEventListener() {},
    removeEventListener() {},
    activeElement: { blur() {}, nodeName: "" },
    querySelector: () => null,
    querySelectorAll: () => [],
    getElementById: () => null,
    createEvent: () => ({ initEvent() {} }),
    createElement: () => ({
      children: [],
      childNodes: [],
      style: {},
      setAttribute() {},
      getElementsByTagName: () => [],
    }),
    createElementNS: () => ({}),
    importNode: () => null,
    location: {
      hash: "",
      host: "",
      hostname: "",
      href: "",
      origin: "",
      pathname: "",
      protocol: "",
      search: "",
    },
  };
  function y() {
    const e = "undefined" != typeof document ? document : {};
    return S(e, w), e;
  }
  const b = {
    document: w,
    navigator: { userAgent: "" },
    location: {
      hash: "",
      host: "",
      hostname: "",
      href: "",
      origin: "",
      pathname: "",
      protocol: "",
      search: "",
    },
    history: { replaceState() {}, pushState() {}, go() {}, back() {} },
    CustomEvent: function () {
      return this;
    },
    addEventListener() {},
    removeEventListener() {},
    getComputedStyle: () => ({ getPropertyValue: () => "" }),
    Image() {},
    Date() {},
    screen: {},
    setTimeout() {},
    clearTimeout() {},
    matchMedia: () => ({}),
    requestAnimationFrame: (e) =>
      "undefined" == typeof setTimeout ? (e(), null) : setTimeout(e, 0),
    cancelAnimationFrame(e) {
      "undefined" != typeof setTimeout && clearTimeout(e);
    },
  };
  function E() {
    const e = "undefined" != typeof window ? window : {};
    return S(e, b), e;
  }
  function T(e, t) {
    return void 0 === t && (t = 0), setTimeout(e, t);
  }
  function x() {
    return Date.now();
  }
  function C(e, t) {
    void 0 === t && (t = "x");
    const s = E();
    let i, a, n;
    const r = (function (e) {
      const t = E();
      let s;
      return (
        t.getComputedStyle && (s = t.getComputedStyle(e, null)),
        !s && e.currentStyle && (s = e.currentStyle),
        s || (s = e.style),
        s
      );
    })(e);
    return (
      s.WebKitCSSMatrix
        ? ((a = r.transform || r.webkitTransform),
          a.split(",").length > 6 &&
            (a = a
              .split(", ")
              .map((e) => e.replace(",", "."))
              .join(", ")),
          (n = new s.WebKitCSSMatrix("none" === a ? "" : a)))
        : ((n =
            r.MozTransform ||
            r.OTransform ||
            r.MsTransform ||
            r.msTransform ||
            r.transform ||
            r
              .getPropertyValue("transform")
              .replace("translate(", "matrix(1, 0, 0, 1,")),
          (i = n.toString().split(","))),
      "x" === t &&
        (a = s.WebKitCSSMatrix
          ? n.m41
          : 16 === i.length
            ? parseFloat(i[12])
            : parseFloat(i[4])),
      "y" === t &&
        (a = s.WebKitCSSMatrix
          ? n.m42
          : 16 === i.length
            ? parseFloat(i[13])
            : parseFloat(i[5])),
      a || 0
    );
  }
  function L(e) {
    return (
      "object" == typeof e &&
      null !== e &&
      e.constructor &&
      "Object" === Object.prototype.toString.call(e).slice(8, -1)
    );
  }
  function A() {
    const e = Object(arguments.length <= 0 ? void 0 : arguments[0]),
      t = ["__proto__", "constructor", "prototype"];
    for (let i = 1; i < arguments.length; i += 1) {
      const a = i < 0 || arguments.length <= i ? void 0 : arguments[i];
      if (
        null != a &&
        ((s = a),
        !("undefined" != typeof window && void 0 !== window.HTMLElement
          ? s instanceof HTMLElement
          : s && (1 === s.nodeType || 11 === s.nodeType)))
      ) {
        const s = Object.keys(Object(a)).filter((e) => t.indexOf(e) < 0);
        for (let t = 0, i = s.length; t < i; t += 1) {
          const i = s[t],
            n = Object.getOwnPropertyDescriptor(a, i);
          void 0 !== n &&
            n.enumerable &&
            (L(e[i]) && L(a[i])
              ? a[i].__swiper__
                ? (e[i] = a[i])
                : A(e[i], a[i])
              : !L(e[i]) && L(a[i])
                ? ((e[i] = {}), a[i].__swiper__ ? (e[i] = a[i]) : A(e[i], a[i]))
                : (e[i] = a[i]));
        }
      }
    }
    var s;
    return e;
  }
  function O(e, t, s) {
    e.style.setProperty(t, s);
  }
  function P(e) {
    let { swiper: t, targetPosition: s, side: i } = e;
    const a = E(),
      n = -t.translate;
    let r,
      l = null;
    const o = t.params.speed;
    (t.wrapperEl.style.scrollSnapType = "none"),
      a.cancelAnimationFrame(t.cssModeFrameID);
    const d = s > n ? "next" : "prev",
      c = (e, t) => ("next" === d && e >= t) || ("prev" === d && e <= t),
      p = () => {
        (r = new Date().getTime()), null === l && (l = r);
        const e = Math.max(Math.min((r - l) / o, 1), 0),
          d = 0.5 - Math.cos(e * Math.PI) / 2;
        let u = n + d * (s - n);
        if ((c(u, s) && (u = s), t.wrapperEl.scrollTo({ [i]: u }), c(u, s)))
          return (
            (t.wrapperEl.style.overflow = "hidden"),
            (t.wrapperEl.style.scrollSnapType = ""),
            setTimeout(() => {
              (t.wrapperEl.style.overflow = ""),
                t.wrapperEl.scrollTo({ [i]: u });
            }),
            void a.cancelAnimationFrame(t.cssModeFrameID)
          );
        t.cssModeFrameID = a.requestAnimationFrame(p);
      };
    p();
  }
  function M(e, t) {
    return (
      void 0 === t && (t = ""), [...e.children].filter((e) => e.matches(t))
    );
  }
  function _(e) {
    try {
      return void console.warn(e);
    } catch (e) {}
  }
  function k(e, t) {
    void 0 === t && (t = []);
    const s = document.createElement(e);
    return (
      s.classList.add(
        ...(Array.isArray(t)
          ? t
          : (function (e) {
              return (
                void 0 === e && (e = ""),
                e
                  .trim()
                  .split(" ")
                  .filter((e) => !!e.trim())
              );
            })(t)),
      ),
      s
    );
  }
  function I(e, t) {
    return E().getComputedStyle(e, null).getPropertyValue(t);
  }
  function D(e) {
    let t,
      s = e;
    if (s) {
      for (t = 0; null !== (s = s.previousSibling); )
        1 === s.nodeType && (t += 1);
      return t;
    }
  }
  function z(e, t, s) {
    const i = E();
    return s
      ? e["width" === t ? "offsetWidth" : "offsetHeight"] +
          parseFloat(
            i
              .getComputedStyle(e, null)
              .getPropertyValue("width" === t ? "margin-right" : "margin-top"),
          ) +
          parseFloat(
            i
              .getComputedStyle(e, null)
              .getPropertyValue(
                "width" === t ? "margin-left" : "margin-bottom",
              ),
          )
      : e.offsetWidth;
  }
  let q, B, G;
  function V() {
    return (
      q ||
        (q = (function () {
          const e = E(),
            t = y();
          return {
            smoothScroll:
              t.documentElement &&
              t.documentElement.style &&
              "scrollBehavior" in t.documentElement.style,
            touch: !!(
              "ontouchstart" in e ||
              (e.DocumentTouch && t instanceof e.DocumentTouch)
            ),
          };
        })()),
      q
    );
  }
  function N(e) {
    return (
      void 0 === e && (e = {}),
      B ||
        (B = (function (e) {
          let { userAgent: t } = void 0 === e ? {} : e;
          const s = V(),
            i = E(),
            a = i.navigator.platform,
            n = t || i.navigator.userAgent,
            r = { ios: !1, android: !1 },
            l = i.screen.width,
            o = i.screen.height,
            d = n.match(/(Android);?[\s\/]+([\d.]+)?/);
          let c = n.match(/(iPad).*OS\s([\d_]+)/);
          const p = n.match(/(iPod)(.*OS\s([\d_]+))?/),
            u = !c && n.match(/(iPhone\sOS|iOS)\s([\d_]+)/),
            h = "Win32" === a;
          let m = "MacIntel" === a;
          return (
            !c &&
              m &&
              s.touch &&
              [
                "1024x1366",
                "1366x1024",
                "834x1194",
                "1194x834",
                "834x1112",
                "1112x834",
                "768x1024",
                "1024x768",
                "820x1180",
                "1180x820",
                "810x1080",
                "1080x810",
              ].indexOf(`${l}x${o}`) >= 0 &&
              ((c = n.match(/(Version)\/([\d.]+)/)),
              c || (c = [0, 1, "13_0_0"]),
              (m = !1)),
            d && !h && ((r.os = "android"), (r.android = !0)),
            (c || u || p) && ((r.os = "ios"), (r.ios = !0)),
            r
          );
        })(e)),
      B
    );
  }
  function F() {
    return (
      G ||
        (G = (function () {
          const e = E();
          let t = !1;
          function s() {
            const t = e.navigator.userAgent.toLowerCase();
            return (
              t.indexOf("safari") >= 0 &&
              t.indexOf("chrome") < 0 &&
              t.indexOf("android") < 0
            );
          }
          if (s()) {
            const s = String(e.navigator.userAgent);
            if (s.includes("Version/")) {
              const [e, i] = s
                .split("Version/")[1]
                .split(" ")[0]
                .split(".")
                .map((e) => Number(e));
              t = e < 16 || (16 === e && i < 2);
            }
          }
          return {
            isSafari: t || s(),
            needPerspectiveFix: t,
            isWebView: /(iPhone|iPod|iPad).*AppleWebKit(?!.*Safari)/i.test(
              e.navigator.userAgent,
            ),
          };
        })()),
      G
    );
  }
  var W = {
    on(e, t, s) {
      const i = this;
      if (!i.eventsListeners || i.destroyed) return i;
      if ("function" != typeof t) return i;
      const a = s ? "unshift" : "push";
      return (
        e.split(" ").forEach((e) => {
          i.eventsListeners[e] || (i.eventsListeners[e] = []),
            i.eventsListeners[e][a](t);
        }),
        i
      );
    },
    once(e, t, s) {
      const i = this;
      if (!i.eventsListeners || i.destroyed) return i;
      if ("function" != typeof t) return i;
      function a() {
        i.off(e, a), a.__emitterProxy && delete a.__emitterProxy;
        for (var s = arguments.length, n = new Array(s), r = 0; r < s; r++)
          n[r] = arguments[r];
        t.apply(i, n);
      }
      return (a.__emitterProxy = t), i.on(e, a, s);
    },
    onAny(e, t) {
      const s = this;
      if (!s.eventsListeners || s.destroyed) return s;
      if ("function" != typeof e) return s;
      const i = t ? "unshift" : "push";
      return (
        s.eventsAnyListeners.indexOf(e) < 0 && s.eventsAnyListeners[i](e), s
      );
    },
    offAny(e) {
      const t = this;
      if (!t.eventsListeners || t.destroyed) return t;
      if (!t.eventsAnyListeners) return t;
      const s = t.eventsAnyListeners.indexOf(e);
      return s >= 0 && t.eventsAnyListeners.splice(s, 1), t;
    },
    off(e, t) {
      const s = this;
      return !s.eventsListeners || s.destroyed
        ? s
        : s.eventsListeners
          ? (e.split(" ").forEach((e) => {
              void 0 === t
                ? (s.eventsListeners[e] = [])
                : s.eventsListeners[e] &&
                  s.eventsListeners[e].forEach((i, a) => {
                    (i === t || (i.__emitterProxy && i.__emitterProxy === t)) &&
                      s.eventsListeners[e].splice(a, 1);
                  });
            }),
            s)
          : s;
    },
    emit() {
      const e = this;
      if (!e.eventsListeners || e.destroyed) return e;
      if (!e.eventsListeners) return e;
      let t, s, i;
      for (var a = arguments.length, n = new Array(a), r = 0; r < a; r++)
        n[r] = arguments[r];
      "string" == typeof n[0] || Array.isArray(n[0])
        ? ((t = n[0]), (s = n.slice(1, n.length)), (i = e))
        : ((t = n[0].events), (s = n[0].data), (i = n[0].context || e)),
        s.unshift(i);
      return (
        (Array.isArray(t) ? t : t.split(" ")).forEach((t) => {
          e.eventsAnyListeners &&
            e.eventsAnyListeners.length &&
            e.eventsAnyListeners.forEach((e) => {
              e.apply(i, [t, ...s]);
            }),
            e.eventsListeners &&
              e.eventsListeners[t] &&
              e.eventsListeners[t].forEach((e) => {
                e.apply(i, s);
              });
        }),
        e
      );
    },
  };
  const H = (e, t) => {
      if (!e || e.destroyed || !e.params) return;
      const s = t.closest(
        e.isElement ? "swiper-slide" : `.${e.params.slideClass}`,
      );
      if (s) {
        let t = s.querySelector(`.${e.params.lazyPreloaderClass}`);
        !t &&
          e.isElement &&
          (s.shadowRoot
            ? (t = s.shadowRoot.querySelector(
                `.${e.params.lazyPreloaderClass}`,
              ))
            : requestAnimationFrame(() => {
                s.shadowRoot &&
                  ((t = s.shadowRoot.querySelector(
                    `.${e.params.lazyPreloaderClass}`,
                  )),
                  t && t.remove());
              })),
          t && t.remove();
      }
    },
    j = (e, t) => {
      if (!e.slides[t]) return;
      const s = e.slides[t].querySelector('[loading="lazy"]');
      s && s.removeAttribute("loading");
    },
    R = (e) => {
      if (!e || e.destroyed || !e.params) return;
      let t = e.params.lazyPreloadPrevNext;
      const s = e.slides.length;
      if (!s || !t || t < 0) return;
      t = Math.min(t, s);
      const i =
          "auto" === e.params.slidesPerView
            ? e.slidesPerViewDynamic()
            : Math.ceil(e.params.slidesPerView),
        a = e.activeIndex;
      if (e.params.grid && e.params.grid.rows > 1) {
        const s = a,
          n = [s - t];
        return (
          n.push(...Array.from({ length: t }).map((e, t) => s + i + t)),
          void e.slides.forEach((t, s) => {
            n.includes(t.column) && j(e, s);
          })
        );
      }
      const n = a + i - 1;
      if (e.params.rewind || e.params.loop)
        for (let i = a - t; i <= n + t; i += 1) {
          const t = ((i % s) + s) % s;
          (t < a || t > n) && j(e, t);
        }
      else
        for (let i = Math.max(a - t, 0); i <= Math.min(n + t, s - 1); i += 1)
          i !== a && (i > n || i < a) && j(e, i);
    };
  var Y = {
    updateSize: function () {
      const e = this;
      let t, s;
      const i = e.el;
      (t =
        void 0 !== e.params.width && null !== e.params.width
          ? e.params.width
          : i.clientWidth),
        (s =
          void 0 !== e.params.height && null !== e.params.height
            ? e.params.height
            : i.clientHeight),
        (0 === t && e.isHorizontal()) ||
          (0 === s && e.isVertical()) ||
          ((t =
            t -
            parseInt(I(i, "padding-left") || 0, 10) -
            parseInt(I(i, "padding-right") || 0, 10)),
          (s =
            s -
            parseInt(I(i, "padding-top") || 0, 10) -
            parseInt(I(i, "padding-bottom") || 0, 10)),
          Number.isNaN(t) && (t = 0),
          Number.isNaN(s) && (s = 0),
          Object.assign(e, {
            width: t,
            height: s,
            size: e.isHorizontal() ? t : s,
          }));
    },
    updateSlides: function () {
      const e = this;
      function t(t, s) {
        return parseFloat(t.getPropertyValue(e.getDirectionLabel(s)) || 0);
      }
      const s = e.params,
        {
          wrapperEl: i,
          slidesEl: a,
          size: n,
          rtlTranslate: r,
          wrongRTL: l,
        } = e,
        o = e.virtual && s.virtual.enabled,
        d = o ? e.virtual.slides.length : e.slides.length,
        c = M(a, `.${e.params.slideClass}, swiper-slide`),
        p = o ? e.virtual.slides.length : c.length;
      let u = [];
      const h = [],
        m = [];
      let f = s.slidesOffsetBefore;
      "function" == typeof f && (f = s.slidesOffsetBefore.call(e));
      let g = s.slidesOffsetAfter;
      "function" == typeof g && (g = s.slidesOffsetAfter.call(e));
      const v = e.snapGrid.length,
        S = e.slidesGrid.length;
      let w = s.spaceBetween,
        y = -f,
        b = 0,
        E = 0;
      if (void 0 === n) return;
      "string" == typeof w && w.indexOf("%") >= 0
        ? (w = (parseFloat(w.replace("%", "")) / 100) * n)
        : "string" == typeof w && (w = parseFloat(w)),
        (e.virtualSize = -w),
        c.forEach((e) => {
          r ? (e.style.marginLeft = "") : (e.style.marginRight = ""),
            (e.style.marginBottom = ""),
            (e.style.marginTop = "");
        }),
        s.centeredSlides &&
          s.cssMode &&
          (O(i, "--swiper-centered-offset-before", ""),
          O(i, "--swiper-centered-offset-after", ""));
      const T = s.grid && s.grid.rows > 1 && e.grid;
      let x;
      T ? e.grid.initSlides(c) : e.grid && e.grid.unsetSlides();
      const C =
        "auto" === s.slidesPerView &&
        s.breakpoints &&
        Object.keys(s.breakpoints).filter(
          (e) => void 0 !== s.breakpoints[e].slidesPerView,
        ).length > 0;
      for (let i = 0; i < p; i += 1) {
        let a;
        if (
          ((x = 0),
          c[i] && (a = c[i]),
          T && e.grid.updateSlide(i, a, c),
          !c[i] || "none" !== I(a, "display"))
        ) {
          if ("auto" === s.slidesPerView) {
            C && (c[i].style[e.getDirectionLabel("width")] = "");
            const n = getComputedStyle(a),
              r = a.style.transform,
              l = a.style.webkitTransform;
            if (
              (r && (a.style.transform = "none"),
              l && (a.style.webkitTransform = "none"),
              s.roundLengths)
            )
              x = e.isHorizontal() ? z(a, "width", !0) : z(a, "height", !0);
            else {
              const e = t(n, "width"),
                s = t(n, "padding-left"),
                i = t(n, "padding-right"),
                r = t(n, "margin-left"),
                l = t(n, "margin-right"),
                o = n.getPropertyValue("box-sizing");
              if (o && "border-box" === o) x = e + r + l;
              else {
                const { clientWidth: t, offsetWidth: n } = a;
                x = e + s + i + r + l + (n - t);
              }
            }
            r && (a.style.transform = r),
              l && (a.style.webkitTransform = l),
              s.roundLengths && (x = Math.floor(x));
          } else
            (x = (n - (s.slidesPerView - 1) * w) / s.slidesPerView),
              s.roundLengths && (x = Math.floor(x)),
              c[i] && (c[i].style[e.getDirectionLabel("width")] = `${x}px`);
          c[i] && (c[i].swiperSlideSize = x),
            m.push(x),
            s.centeredSlides
              ? ((y = y + x / 2 + b / 2 + w),
                0 === b && 0 !== i && (y = y - n / 2 - w),
                0 === i && (y = y - n / 2 - w),
                Math.abs(y) < 0.001 && (y = 0),
                s.roundLengths && (y = Math.floor(y)),
                E % s.slidesPerGroup == 0 && u.push(y),
                h.push(y))
              : (s.roundLengths && (y = Math.floor(y)),
                (E - Math.min(e.params.slidesPerGroupSkip, E)) %
                  e.params.slidesPerGroup ==
                  0 && u.push(y),
                h.push(y),
                (y = y + x + w)),
            (e.virtualSize += x + w),
            (b = x),
            (E += 1);
        }
      }
      if (
        ((e.virtualSize = Math.max(e.virtualSize, n) + g),
        r &&
          l &&
          ("slide" === s.effect || "coverflow" === s.effect) &&
          (i.style.width = `${e.virtualSize + w}px`),
        s.setWrapperSize &&
          (i.style[e.getDirectionLabel("width")] = `${e.virtualSize + w}px`),
        T && e.grid.updateWrapperSize(x, u),
        !s.centeredSlides)
      ) {
        const t = [];
        for (let i = 0; i < u.length; i += 1) {
          let a = u[i];
          s.roundLengths && (a = Math.floor(a)),
            u[i] <= e.virtualSize - n && t.push(a);
        }
        (u = t),
          Math.floor(e.virtualSize - n) - Math.floor(u[u.length - 1]) > 1 &&
            u.push(e.virtualSize - n);
      }
      if (o && s.loop) {
        const t = m[0] + w;
        if (s.slidesPerGroup > 1) {
          const i = Math.ceil(
              (e.virtual.slidesBefore + e.virtual.slidesAfter) /
                s.slidesPerGroup,
            ),
            a = t * s.slidesPerGroup;
          for (let e = 0; e < i; e += 1) u.push(u[u.length - 1] + a);
        }
        for (
          let i = 0;
          i < e.virtual.slidesBefore + e.virtual.slidesAfter;
          i += 1
        )
          1 === s.slidesPerGroup && u.push(u[u.length - 1] + t),
            h.push(h[h.length - 1] + t),
            (e.virtualSize += t);
      }
      if ((0 === u.length && (u = [0]), 0 !== w)) {
        const t =
          e.isHorizontal() && r
            ? "marginLeft"
            : e.getDirectionLabel("marginRight");
        c.filter(
          (e, t) => !(s.cssMode && !s.loop) || t !== c.length - 1,
        ).forEach((e) => {
          e.style[t] = `${w}px`;
        });
      }
      if (s.centeredSlides && s.centeredSlidesBounds) {
        let e = 0;
        m.forEach((t) => {
          e += t + (w || 0);
        }),
          (e -= w);
        const t = e - n;
        u = u.map((e) => (e <= 0 ? -f : e > t ? t + g : e));
      }
      if (s.centerInsufficientSlides) {
        let e = 0;
        if (
          (m.forEach((t) => {
            e += t + (w || 0);
          }),
          (e -= w),
          e < n)
        ) {
          const t = (n - e) / 2;
          u.forEach((e, s) => {
            u[s] = e - t;
          }),
            h.forEach((e, s) => {
              h[s] = e + t;
            });
        }
      }
      if (
        (Object.assign(e, {
          slides: c,
          snapGrid: u,
          slidesGrid: h,
          slidesSizesGrid: m,
        }),
        s.centeredSlides && s.cssMode && !s.centeredSlidesBounds)
      ) {
        O(i, "--swiper-centered-offset-before", -u[0] + "px"),
          O(
            i,
            "--swiper-centered-offset-after",
            e.size / 2 - m[m.length - 1] / 2 + "px",
          );
        const t = -e.snapGrid[0],
          s = -e.slidesGrid[0];
        (e.snapGrid = e.snapGrid.map((e) => e + t)),
          (e.slidesGrid = e.slidesGrid.map((e) => e + s));
      }
      if (
        (p !== d && e.emit("slidesLengthChange"),
        u.length !== v &&
          (e.params.watchOverflow && e.checkOverflow(),
          e.emit("snapGridLengthChange")),
        h.length !== S && e.emit("slidesGridLengthChange"),
        s.watchSlidesProgress && e.updateSlidesOffset(),
        e.emit("slidesUpdated"),
        !(o || s.cssMode || ("slide" !== s.effect && "fade" !== s.effect)))
      ) {
        const t = `${s.containerModifierClass}backface-hidden`,
          i = e.el.classList.contains(t);
        p <= s.maxBackfaceHiddenSlides
          ? i || e.el.classList.add(t)
          : i && e.el.classList.remove(t);
      }
    },
    updateAutoHeight: function (e) {
      const t = this,
        s = [],
        i = t.virtual && t.params.virtual.enabled;
      let a,
        n = 0;
      "number" == typeof e
        ? t.setTransition(e)
        : !0 === e && t.setTransition(t.params.speed);
      const r = (e) => (i ? t.slides[t.getSlideIndexByData(e)] : t.slides[e]);
      if ("auto" !== t.params.slidesPerView && t.params.slidesPerView > 1)
        if (t.params.centeredSlides)
          (t.visibleSlides || []).forEach((e) => {
            s.push(e);
          });
        else
          for (a = 0; a < Math.ceil(t.params.slidesPerView); a += 1) {
            const e = t.activeIndex + a;
            if (e > t.slides.length && !i) break;
            s.push(r(e));
          }
      else s.push(r(t.activeIndex));
      for (a = 0; a < s.length; a += 1)
        if (void 0 !== s[a]) {
          const e = s[a].offsetHeight;
          n = e > n ? e : n;
        }
      (n || 0 === n) && (t.wrapperEl.style.height = `${n}px`);
    },
    updateSlidesOffset: function () {
      const e = this,
        t = e.slides,
        s = e.isElement
          ? e.isHorizontal()
            ? e.wrapperEl.offsetLeft
            : e.wrapperEl.offsetTop
          : 0;
      for (let i = 0; i < t.length; i += 1)
        t[i].swiperSlideOffset =
          (e.isHorizontal() ? t[i].offsetLeft : t[i].offsetTop) -
          s -
          e.cssOverflowAdjustment();
    },
    updateSlidesProgress: function (e) {
      void 0 === e && (e = (this && this.translate) || 0);
      const t = this,
        s = t.params,
        { slides: i, rtlTranslate: a, snapGrid: n } = t;
      if (0 === i.length) return;
      void 0 === i[0].swiperSlideOffset && t.updateSlidesOffset();
      let r = -e;
      a && (r = e),
        i.forEach((e) => {
          e.classList.remove(s.slideVisibleClass, s.slideFullyVisibleClass);
        }),
        (t.visibleSlidesIndexes = []),
        (t.visibleSlides = []);
      let l = s.spaceBetween;
      "string" == typeof l && l.indexOf("%") >= 0
        ? (l = (parseFloat(l.replace("%", "")) / 100) * t.size)
        : "string" == typeof l && (l = parseFloat(l));
      for (let e = 0; e < i.length; e += 1) {
        const o = i[e];
        let d = o.swiperSlideOffset;
        s.cssMode && s.centeredSlides && (d -= i[0].swiperSlideOffset);
        const c =
            (r + (s.centeredSlides ? t.minTranslate() : 0) - d) /
            (o.swiperSlideSize + l),
          p =
            (r - n[0] + (s.centeredSlides ? t.minTranslate() : 0) - d) /
            (o.swiperSlideSize + l),
          u = -(r - d),
          h = u + t.slidesSizesGrid[e],
          m = u >= 0 && u <= t.size - t.slidesSizesGrid[e];
        ((u >= 0 && u < t.size - 1) ||
          (h > 1 && h <= t.size) ||
          (u <= 0 && h >= t.size)) &&
          (t.visibleSlides.push(o),
          t.visibleSlidesIndexes.push(e),
          i[e].classList.add(s.slideVisibleClass)),
          m && i[e].classList.add(s.slideFullyVisibleClass),
          (o.progress = a ? -c : c),
          (o.originalProgress = a ? -p : p);
      }
    },
    updateProgress: function (e) {
      const t = this;
      if (void 0 === e) {
        const s = t.rtlTranslate ? -1 : 1;
        e = (t && t.translate && t.translate * s) || 0;
      }
      const s = t.params,
        i = t.maxTranslate() - t.minTranslate();
      let { progress: a, isBeginning: n, isEnd: r, progressLoop: l } = t;
      const o = n,
        d = r;
      if (0 === i) (a = 0), (n = !0), (r = !0);
      else {
        a = (e - t.minTranslate()) / i;
        const s = Math.abs(e - t.minTranslate()) < 1,
          l = Math.abs(e - t.maxTranslate()) < 1;
        (n = s || a <= 0), (r = l || a >= 1), s && (a = 0), l && (a = 1);
      }
      if (s.loop) {
        const s = t.getSlideIndexByData(0),
          i = t.getSlideIndexByData(t.slides.length - 1),
          a = t.slidesGrid[s],
          n = t.slidesGrid[i],
          r = t.slidesGrid[t.slidesGrid.length - 1],
          o = Math.abs(e);
        (l = o >= a ? (o - a) / r : (o + r - n) / r), l > 1 && (l -= 1);
      }
      Object.assign(t, {
        progress: a,
        progressLoop: l,
        isBeginning: n,
        isEnd: r,
      }),
        (s.watchSlidesProgress || (s.centeredSlides && s.autoHeight)) &&
          t.updateSlidesProgress(e),
        n && !o && t.emit("reachBeginning toEdge"),
        r && !d && t.emit("reachEnd toEdge"),
        ((o && !n) || (d && !r)) && t.emit("fromEdge"),
        t.emit("progress", a);
    },
    updateSlidesClasses: function () {
      const e = this,
        { slides: t, params: s, slidesEl: i, activeIndex: a } = e,
        n = e.virtual && s.virtual.enabled,
        r = e.grid && s.grid && s.grid.rows > 1,
        l = (e) => M(i, `.${s.slideClass}${e}, swiper-slide${e}`)[0];
      let o, d, c;
      if (
        (t.forEach((e) => {
          e.classList.remove(
            s.slideActiveClass,
            s.slideNextClass,
            s.slidePrevClass,
          );
        }),
        n)
      )
        if (s.loop) {
          let t = a - e.virtual.slidesBefore;
          t < 0 && (t = e.virtual.slides.length + t),
            t >= e.virtual.slides.length && (t -= e.virtual.slides.length),
            (o = l(`[data-swiper-slide-index="${t}"]`));
        } else o = l(`[data-swiper-slide-index="${a}"]`);
      else
        r
          ? ((o = t.filter((e) => e.column === a)[0]),
            (c = t.filter((e) => e.column === a + 1)[0]),
            (d = t.filter((e) => e.column === a - 1)[0]))
          : (o = t[a]);
      o &&
        (o.classList.add(s.slideActiveClass),
        r
          ? (c && c.classList.add(s.slideNextClass),
            d && d.classList.add(s.slidePrevClass))
          : ((c = (function (e, t) {
              const s = [];
              for (; e.nextElementSibling; ) {
                const i = e.nextElementSibling;
                t ? i.matches(t) && s.push(i) : s.push(i), (e = i);
              }
              return s;
            })(o, `.${s.slideClass}, swiper-slide`)[0]),
            s.loop && !c && (c = t[0]),
            c && c.classList.add(s.slideNextClass),
            (d = (function (e, t) {
              const s = [];
              for (; e.previousElementSibling; ) {
                const i = e.previousElementSibling;
                t ? i.matches(t) && s.push(i) : s.push(i), (e = i);
              }
              return s;
            })(o, `.${s.slideClass}, swiper-slide`)[0]),
            s.loop && 0 === !d && (d = t[t.length - 1]),
            d && d.classList.add(s.slidePrevClass))),
        e.emitSlidesClasses();
    },
    updateActiveIndex: function (e) {
      const t = this,
        s = t.rtlTranslate ? t.translate : -t.translate,
        {
          snapGrid: i,
          params: a,
          activeIndex: n,
          realIndex: r,
          snapIndex: l,
        } = t;
      let o,
        d = e;
      const c = (e) => {
        let s = e - t.virtual.slidesBefore;
        return (
          s < 0 && (s = t.virtual.slides.length + s),
          s >= t.virtual.slides.length && (s -= t.virtual.slides.length),
          s
        );
      };
      if (
        (void 0 === d &&
          (d = (function (e) {
            const { slidesGrid: t, params: s } = e,
              i = e.rtlTranslate ? e.translate : -e.translate;
            let a;
            for (let e = 0; e < t.length; e += 1)
              void 0 !== t[e + 1]
                ? i >= t[e] && i < t[e + 1] - (t[e + 1] - t[e]) / 2
                  ? (a = e)
                  : i >= t[e] && i < t[e + 1] && (a = e + 1)
                : i >= t[e] && (a = e);
            return (
              s.normalizeSlideIndex && (a < 0 || void 0 === a) && (a = 0), a
            );
          })(t)),
        i.indexOf(s) >= 0)
      )
        o = i.indexOf(s);
      else {
        const e = Math.min(a.slidesPerGroupSkip, d);
        o = e + Math.floor((d - e) / a.slidesPerGroup);
      }
      if ((o >= i.length && (o = i.length - 1), d === n && !t.params.loop))
        return void (o !== l && ((t.snapIndex = o), t.emit("snapIndexChange")));
      if (d === n && t.params.loop && t.virtual && t.params.virtual.enabled)
        return void (t.realIndex = c(d));
      const p = t.grid && a.grid && a.grid.rows > 1;
      let u;
      if (t.virtual && a.virtual.enabled && a.loop) u = c(d);
      else if (p) {
        const e = t.slides.filter((e) => e.column === d)[0];
        let s = parseInt(e.getAttribute("data-swiper-slide-index"), 10);
        Number.isNaN(s) && (s = Math.max(t.slides.indexOf(e), 0)),
          (u = Math.floor(s / a.grid.rows));
      } else if (t.slides[d]) {
        const e = t.slides[d].getAttribute("data-swiper-slide-index");
        u = e ? parseInt(e, 10) : d;
      } else u = d;
      Object.assign(t, {
        previousSnapIndex: l,
        snapIndex: o,
        previousRealIndex: r,
        realIndex: u,
        previousIndex: n,
        activeIndex: d,
      }),
        t.initialized && R(t),
        t.emit("activeIndexChange"),
        t.emit("snapIndexChange"),
        (t.initialized || t.params.runCallbacksOnInit) &&
          (r !== u && t.emit("realIndexChange"), t.emit("slideChange"));
    },
    updateClickedSlide: function (e, t) {
      const s = this,
        i = s.params;
      let a = e.closest(`.${i.slideClass}, swiper-slide`);
      !a &&
        s.isElement &&
        t &&
        t.length > 1 &&
        t.includes(e) &&
        [...t.slice(t.indexOf(e) + 1, t.length)].forEach((e) => {
          !a &&
            e.matches &&
            e.matches(`.${i.slideClass}, swiper-slide`) &&
            (a = e);
        });
      let n,
        r = !1;
      if (a)
        for (let e = 0; e < s.slides.length; e += 1)
          if (s.slides[e] === a) {
            (r = !0), (n = e);
            break;
          }
      if (!a || !r)
        return (s.clickedSlide = void 0), void (s.clickedIndex = void 0);
      (s.clickedSlide = a),
        s.virtual && s.params.virtual.enabled
          ? (s.clickedIndex = parseInt(
              a.getAttribute("data-swiper-slide-index"),
              10,
            ))
          : (s.clickedIndex = n),
        i.slideToClickedSlide &&
          void 0 !== s.clickedIndex &&
          s.clickedIndex !== s.activeIndex &&
          s.slideToClickedSlide();
    },
  };
  var X = {
    getTranslate: function (e) {
      void 0 === e && (e = this.isHorizontal() ? "x" : "y");
      const { params: t, rtlTranslate: s, translate: i, wrapperEl: a } = this;
      if (t.virtualTranslate) return s ? -i : i;
      if (t.cssMode) return i;
      let n = C(a, e);
      return (n += this.cssOverflowAdjustment()), s && (n = -n), n || 0;
    },
    setTranslate: function (e, t) {
      const s = this,
        { rtlTranslate: i, params: a, wrapperEl: n, progress: r } = s;
      let l,
        o = 0,
        d = 0;
      s.isHorizontal() ? (o = i ? -e : e) : (d = e),
        a.roundLengths && ((o = Math.floor(o)), (d = Math.floor(d))),
        (s.previousTranslate = s.translate),
        (s.translate = s.isHorizontal() ? o : d),
        a.cssMode
          ? (n[s.isHorizontal() ? "scrollLeft" : "scrollTop"] = s.isHorizontal()
              ? -o
              : -d)
          : a.virtualTranslate ||
            (s.isHorizontal()
              ? (o -= s.cssOverflowAdjustment())
              : (d -= s.cssOverflowAdjustment()),
            (n.style.transform = `translate3d(${o}px, ${d}px, 0px)`));
      const c = s.maxTranslate() - s.minTranslate();
      (l = 0 === c ? 0 : (e - s.minTranslate()) / c),
        l !== r && s.updateProgress(e),
        s.emit("setTranslate", s.translate, t);
    },
    minTranslate: function () {
      return -this.snapGrid[0];
    },
    maxTranslate: function () {
      return -this.snapGrid[this.snapGrid.length - 1];
    },
    translateTo: function (e, t, s, i, a) {
      void 0 === e && (e = 0),
        void 0 === t && (t = this.params.speed),
        void 0 === s && (s = !0),
        void 0 === i && (i = !0);
      const n = this,
        { params: r, wrapperEl: l } = n;
      if (n.animating && r.preventInteractionOnTransition) return !1;
      const o = n.minTranslate(),
        d = n.maxTranslate();
      let c;
      if (
        ((c = i && e > o ? o : i && e < d ? d : e),
        n.updateProgress(c),
        r.cssMode)
      ) {
        const e = n.isHorizontal();
        if (0 === t) l[e ? "scrollLeft" : "scrollTop"] = -c;
        else {
          if (!n.support.smoothScroll)
            return (
              P({ swiper: n, targetPosition: -c, side: e ? "left" : "top" }), !0
            );
          l.scrollTo({ [e ? "left" : "top"]: -c, behavior: "smooth" });
        }
        return !0;
      }
      return (
        0 === t
          ? (n.setTransition(0),
            n.setTranslate(c),
            s &&
              (n.emit("beforeTransitionStart", t, a), n.emit("transitionEnd")))
          : (n.setTransition(t),
            n.setTranslate(c),
            s &&
              (n.emit("beforeTransitionStart", t, a),
              n.emit("transitionStart")),
            n.animating ||
              ((n.animating = !0),
              n.onTranslateToWrapperTransitionEnd ||
                (n.onTranslateToWrapperTransitionEnd = function (e) {
                  n &&
                    !n.destroyed &&
                    e.target === this &&
                    (n.wrapperEl.removeEventListener(
                      "transitionend",
                      n.onTranslateToWrapperTransitionEnd,
                    ),
                    (n.onTranslateToWrapperTransitionEnd = null),
                    delete n.onTranslateToWrapperTransitionEnd,
                    s && n.emit("transitionEnd"));
                }),
              n.wrapperEl.addEventListener(
                "transitionend",
                n.onTranslateToWrapperTransitionEnd,
              ))),
        !0
      );
    },
  };
  function U(e) {
    let { swiper: t, runCallbacks: s, direction: i, step: a } = e;
    const { activeIndex: n, previousIndex: r } = t;
    let l = i;
    if (
      (l || (l = n > r ? "next" : n < r ? "prev" : "reset"),
      t.emit(`transition${a}`),
      s && n !== r)
    ) {
      if ("reset" === l) return void t.emit(`slideResetTransition${a}`);
      t.emit(`slideChangeTransition${a}`),
        "next" === l
          ? t.emit(`slideNextTransition${a}`)
          : t.emit(`slidePrevTransition${a}`);
    }
  }
  var Z = {
    slideTo: function (e, t, s, i, a) {
      void 0 === e && (e = 0),
        void 0 === t && (t = this.params.speed),
        void 0 === s && (s = !0),
        "string" == typeof e && (e = parseInt(e, 10));
      const n = this;
      let r = e;
      r < 0 && (r = 0);
      const {
        params: l,
        snapGrid: o,
        slidesGrid: d,
        previousIndex: c,
        activeIndex: p,
        rtlTranslate: u,
        wrapperEl: h,
        enabled: m,
      } = n;
      if ((n.animating && l.preventInteractionOnTransition) || (!m && !i && !a))
        return !1;
      const f = Math.min(n.params.slidesPerGroupSkip, r);
      let g = f + Math.floor((r - f) / n.params.slidesPerGroup);
      g >= o.length && (g = o.length - 1);
      const v = -o[g];
      if (l.normalizeSlideIndex)
        for (let e = 0; e < d.length; e += 1) {
          const t = -Math.floor(100 * v),
            s = Math.floor(100 * d[e]),
            i = Math.floor(100 * d[e + 1]);
          void 0 !== d[e + 1]
            ? t >= s && t < i - (i - s) / 2
              ? (r = e)
              : t >= s && t < i && (r = e + 1)
            : t >= s && (r = e);
        }
      if (n.initialized && r !== p) {
        if (
          !n.allowSlideNext &&
          (u
            ? v > n.translate && v > n.minTranslate()
            : v < n.translate && v < n.minTranslate())
        )
          return !1;
        if (
          !n.allowSlidePrev &&
          v > n.translate &&
          v > n.maxTranslate() &&
          (p || 0) !== r
        )
          return !1;
      }
      let S;
      if (
        (r !== (c || 0) && s && n.emit("beforeSlideChangeStart"),
        n.updateProgress(v),
        (S = r > p ? "next" : r < p ? "prev" : "reset"),
        (u && -v === n.translate) || (!u && v === n.translate))
      )
        return (
          n.updateActiveIndex(r),
          l.autoHeight && n.updateAutoHeight(),
          n.updateSlidesClasses(),
          "slide" !== l.effect && n.setTranslate(v),
          "reset" !== S && (n.transitionStart(s, S), n.transitionEnd(s, S)),
          !1
        );
      if (l.cssMode) {
        const e = n.isHorizontal(),
          s = u ? v : -v;
        if (0 === t) {
          const t = n.virtual && n.params.virtual.enabled;
          t &&
            ((n.wrapperEl.style.scrollSnapType = "none"),
            (n._immediateVirtual = !0)),
            t && !n._cssModeVirtualInitialSet && n.params.initialSlide > 0
              ? ((n._cssModeVirtualInitialSet = !0),
                requestAnimationFrame(() => {
                  h[e ? "scrollLeft" : "scrollTop"] = s;
                }))
              : (h[e ? "scrollLeft" : "scrollTop"] = s),
            t &&
              requestAnimationFrame(() => {
                (n.wrapperEl.style.scrollSnapType = ""),
                  (n._immediateVirtual = !1);
              });
        } else {
          if (!n.support.smoothScroll)
            return (
              P({ swiper: n, targetPosition: s, side: e ? "left" : "top" }), !0
            );
          h.scrollTo({ [e ? "left" : "top"]: s, behavior: "smooth" });
        }
        return !0;
      }
      return (
        n.setTransition(t),
        n.setTranslate(v),
        n.updateActiveIndex(r),
        n.updateSlidesClasses(),
        n.emit("beforeTransitionStart", t, i),
        n.transitionStart(s, S),
        0 === t
          ? n.transitionEnd(s, S)
          : n.animating ||
            ((n.animating = !0),
            n.onSlideToWrapperTransitionEnd ||
              (n.onSlideToWrapperTransitionEnd = function (e) {
                n &&
                  !n.destroyed &&
                  e.target === this &&
                  (n.wrapperEl.removeEventListener(
                    "transitionend",
                    n.onSlideToWrapperTransitionEnd,
                  ),
                  (n.onSlideToWrapperTransitionEnd = null),
                  delete n.onSlideToWrapperTransitionEnd,
                  n.transitionEnd(s, S));
              }),
            n.wrapperEl.addEventListener(
              "transitionend",
              n.onSlideToWrapperTransitionEnd,
            )),
        !0
      );
    },
    slideToLoop: function (e, t, s, i) {
      if (
        (void 0 === e && (e = 0),
        void 0 === t && (t = this.params.speed),
        void 0 === s && (s = !0),
        "string" == typeof e)
      ) {
        e = parseInt(e, 10);
      }
      const a = this,
        n = a.grid && a.params.grid && a.params.grid.rows > 1;
      let r = e;
      if (a.params.loop)
        if (a.virtual && a.params.virtual.enabled) r += a.virtual.slidesBefore;
        else {
          let e;
          if (n) {
            const t = r * a.params.grid.rows;
            e = a.slides.filter(
              (e) => 1 * e.getAttribute("data-swiper-slide-index") === t,
            )[0].column;
          } else e = a.getSlideIndexByData(r);
          const t = n
              ? Math.ceil(a.slides.length / a.params.grid.rows)
              : a.slides.length,
            { centeredSlides: s } = a.params;
          let i = a.params.slidesPerView;
          "auto" === i
            ? (i = a.slidesPerViewDynamic())
            : ((i = Math.ceil(parseFloat(a.params.slidesPerView, 10))),
              s && i % 2 == 0 && (i += 1));
          let l = t - e < i;
          if ((s && (l = l || e < Math.ceil(i / 2)), l)) {
            const i = s
              ? e < a.activeIndex
                ? "prev"
                : "next"
              : e - a.activeIndex - 1 < a.params.slidesPerView
                ? "next"
                : "prev";
            a.loopFix({
              direction: i,
              slideTo: !0,
              activeSlideIndex: "next" === i ? e + 1 : e - t + 1,
              slideRealIndex: "next" === i ? a.realIndex : void 0,
            });
          }
          if (n) {
            const e = r * a.params.grid.rows;
            r = a.slides.filter(
              (t) => 1 * t.getAttribute("data-swiper-slide-index") === e,
            )[0].column;
          } else r = a.getSlideIndexByData(r);
        }
      return (
        requestAnimationFrame(() => {
          a.slideTo(r, t, s, i);
        }),
        a
      );
    },
    slideNext: function (e, t, s) {
      void 0 === e && (e = this.params.speed), void 0 === t && (t = !0);
      const i = this,
        { enabled: a, params: n, animating: r } = i;
      if (!a) return i;
      let l = n.slidesPerGroup;
      "auto" === n.slidesPerView &&
        1 === n.slidesPerGroup &&
        n.slidesPerGroupAuto &&
        (l = Math.max(i.slidesPerViewDynamic("current", !0), 1));
      const o = i.activeIndex < n.slidesPerGroupSkip ? 1 : l,
        d = i.virtual && n.virtual.enabled;
      if (n.loop) {
        if (r && !d && n.loopPreventsSliding) return !1;
        if (
          (i.loopFix({ direction: "next" }),
          (i._clientLeft = i.wrapperEl.clientLeft),
          i.activeIndex === i.slides.length - 1 && n.cssMode)
        )
          return (
            requestAnimationFrame(() => {
              i.slideTo(i.activeIndex + o, e, t, s);
            }),
            !0
          );
      }
      return n.rewind && i.isEnd
        ? i.slideTo(0, e, t, s)
        : i.slideTo(i.activeIndex + o, e, t, s);
    },
    slidePrev: function (e, t, s) {
      void 0 === e && (e = this.params.speed), void 0 === t && (t = !0);
      const i = this,
        {
          params: a,
          snapGrid: n,
          slidesGrid: r,
          rtlTranslate: l,
          enabled: o,
          animating: d,
        } = i;
      if (!o) return i;
      const c = i.virtual && a.virtual.enabled;
      if (a.loop) {
        if (d && !c && a.loopPreventsSliding) return !1;
        i.loopFix({ direction: "prev" }),
          (i._clientLeft = i.wrapperEl.clientLeft);
      }
      function p(e) {
        return e < 0 ? -Math.floor(Math.abs(e)) : Math.floor(e);
      }
      const u = p(l ? i.translate : -i.translate),
        h = n.map((e) => p(e));
      let m = n[h.indexOf(u) - 1];
      if (void 0 === m && a.cssMode) {
        let e;
        n.forEach((t, s) => {
          u >= t && (e = s);
        }),
          void 0 !== e && (m = n[e > 0 ? e - 1 : e]);
      }
      let f = 0;
      if (
        (void 0 !== m &&
          ((f = r.indexOf(m)),
          f < 0 && (f = i.activeIndex - 1),
          "auto" === a.slidesPerView &&
            1 === a.slidesPerGroup &&
            a.slidesPerGroupAuto &&
            ((f = f - i.slidesPerViewDynamic("previous", !0) + 1),
            (f = Math.max(f, 0)))),
        a.rewind && i.isBeginning)
      ) {
        const a =
          i.params.virtual && i.params.virtual.enabled && i.virtual
            ? i.virtual.slides.length - 1
            : i.slides.length - 1;
        return i.slideTo(a, e, t, s);
      }
      return a.loop && 0 === i.activeIndex && a.cssMode
        ? (requestAnimationFrame(() => {
            i.slideTo(f, e, t, s);
          }),
          !0)
        : i.slideTo(f, e, t, s);
    },
    slideReset: function (e, t, s) {
      return (
        void 0 === e && (e = this.params.speed),
        void 0 === t && (t = !0),
        this.slideTo(this.activeIndex, e, t, s)
      );
    },
    slideToClosest: function (e, t, s, i) {
      void 0 === e && (e = this.params.speed),
        void 0 === t && (t = !0),
        void 0 === i && (i = 0.5);
      const a = this;
      let n = a.activeIndex;
      const r = Math.min(a.params.slidesPerGroupSkip, n),
        l = r + Math.floor((n - r) / a.params.slidesPerGroup),
        o = a.rtlTranslate ? a.translate : -a.translate;
      if (o >= a.snapGrid[l]) {
        const e = a.snapGrid[l];
        o - e > (a.snapGrid[l + 1] - e) * i && (n += a.params.slidesPerGroup);
      } else {
        const e = a.snapGrid[l - 1];
        o - e <= (a.snapGrid[l] - e) * i && (n -= a.params.slidesPerGroup);
      }
      return (
        (n = Math.max(n, 0)),
        (n = Math.min(n, a.slidesGrid.length - 1)),
        a.slideTo(n, e, t, s)
      );
    },
    slideToClickedSlide: function () {
      const e = this,
        { params: t, slidesEl: s } = e,
        i =
          "auto" === t.slidesPerView
            ? e.slidesPerViewDynamic()
            : t.slidesPerView;
      let a,
        n = e.clickedIndex;
      const r = e.isElement ? "swiper-slide" : `.${t.slideClass}`;
      if (t.loop) {
        if (e.animating) return;
        (a = parseInt(
          e.clickedSlide.getAttribute("data-swiper-slide-index"),
          10,
        )),
          t.centeredSlides
            ? n < e.loopedSlides - i / 2 ||
              n > e.slides.length - e.loopedSlides + i / 2
              ? (e.loopFix(),
                (n = e.getSlideIndex(
                  M(s, `${r}[data-swiper-slide-index="${a}"]`)[0],
                )),
                T(() => {
                  e.slideTo(n);
                }))
              : e.slideTo(n)
            : n > e.slides.length - i
              ? (e.loopFix(),
                (n = e.getSlideIndex(
                  M(s, `${r}[data-swiper-slide-index="${a}"]`)[0],
                )),
                T(() => {
                  e.slideTo(n);
                }))
              : e.slideTo(n);
      } else e.slideTo(n);
    },
  };
  var K = {
    loopCreate: function (e) {
      const t = this,
        { params: s, slidesEl: i } = t;
      if (!s.loop || (t.virtual && t.params.virtual.enabled)) return;
      const a = () => {
          M(i, `.${s.slideClass}, swiper-slide`).forEach((e, t) => {
            e.setAttribute("data-swiper-slide-index", t);
          });
        },
        n = t.grid && s.grid && s.grid.rows > 1,
        r = s.slidesPerGroup * (n ? s.grid.rows : 1),
        l = t.slides.length % r != 0,
        o = n && t.slides.length % s.grid.rows != 0,
        d = (e) => {
          for (let i = 0; i < e; i += 1) {
            const e = t.isElement
              ? k("swiper-slide", [s.slideBlankClass])
              : k("div", [s.slideClass, s.slideBlankClass]);
            t.slidesEl.append(e);
          }
        };
      if (l) {
        if (s.loopAddBlankSlides) {
          d(r - (t.slides.length % r)), t.recalcSlides(), t.updateSlides();
        } else
          _(
            "Swiper Loop Warning: The number of slides is not even to slidesPerGroup, loop mode may not function properly. You need to add more slides (or make duplicates, or empty slides)",
          );
        a();
      } else if (o) {
        if (s.loopAddBlankSlides) {
          d(s.grid.rows - (t.slides.length % s.grid.rows)),
            t.recalcSlides(),
            t.updateSlides();
        } else
          _(
            "Swiper Loop Warning: The number of slides is not even to grid.rows, loop mode may not function properly. You need to add more slides (or make duplicates, or empty slides)",
          );
        a();
      } else a();
      t.loopFix({
        slideRealIndex: e,
        direction: s.centeredSlides ? void 0 : "next",
      });
    },
    loopFix: function (e) {
      let {
        slideRealIndex: t,
        slideTo: s = !0,
        direction: i,
        setTranslate: a,
        activeSlideIndex: n,
        byController: r,
        byMousewheel: l,
      } = void 0 === e ? {} : e;
      const o = this;
      if (!o.params.loop) return;
      o.emit("beforeLoopFix");
      const {
          slides: d,
          allowSlidePrev: c,
          allowSlideNext: p,
          slidesEl: u,
          params: h,
        } = o,
        { centeredSlides: m } = h;
      if (
        ((o.allowSlidePrev = !0),
        (o.allowSlideNext = !0),
        o.virtual && h.virtual.enabled)
      )
        return (
          s &&
            (h.centeredSlides || 0 !== o.snapIndex
              ? h.centeredSlides && o.snapIndex < h.slidesPerView
                ? o.slideTo(o.virtual.slides.length + o.snapIndex, 0, !1, !0)
                : o.snapIndex === o.snapGrid.length - 1 &&
                  o.slideTo(o.virtual.slidesBefore, 0, !1, !0)
              : o.slideTo(o.virtual.slides.length, 0, !1, !0)),
          (o.allowSlidePrev = c),
          (o.allowSlideNext = p),
          void o.emit("loopFix")
        );
      let f = h.slidesPerView;
      "auto" === f
        ? (f = o.slidesPerViewDynamic())
        : ((f = Math.ceil(parseFloat(h.slidesPerView, 10))),
          m && f % 2 == 0 && (f += 1));
      const g = h.slidesPerGroupAuto ? f : h.slidesPerGroup;
      let v = g;
      v % g != 0 && (v += g - (v % g)),
        (v += h.loopAdditionalSlides),
        (o.loopedSlides = v);
      const S = o.grid && h.grid && h.grid.rows > 1;
      d.length < f + v
        ? _(
            "Swiper Loop Warning: The number of slides is not enough for loop mode, it will be disabled and not function properly. You need to add more slides (or make duplicates) or lower the values of slidesPerView and slidesPerGroup parameters",
          )
        : S &&
          "row" === h.grid.fill &&
          _(
            "Swiper Loop Warning: Loop mode is not compatible with grid.fill = `row`",
          );
      const w = [],
        y = [];
      let b = o.activeIndex;
      void 0 === n
        ? (n = o.getSlideIndex(
            d.filter((e) => e.classList.contains(h.slideActiveClass))[0],
          ))
        : (b = n);
      const E = "next" === i || !i,
        T = "prev" === i || !i;
      let x = 0,
        C = 0;
      const L = S ? Math.ceil(d.length / h.grid.rows) : d.length,
        A = (S ? d[n].column : n) + (m && void 0 === a ? -f / 2 + 0.5 : 0);
      if (A < v) {
        x = Math.max(v - A, g);
        for (let e = 0; e < v - A; e += 1) {
          const t = e - Math.floor(e / L) * L;
          if (S) {
            const e = L - t - 1;
            for (let t = d.length - 1; t >= 0; t -= 1)
              d[t].column === e && w.push(t);
          } else w.push(L - t - 1);
        }
      } else if (A + f > L - v) {
        C = Math.max(A - (L - 2 * v), g);
        for (let e = 0; e < C; e += 1) {
          const t = e - Math.floor(e / L) * L;
          S
            ? d.forEach((e, s) => {
                e.column === t && y.push(s);
              })
            : y.push(t);
        }
      }
      if (
        ((o.__preventObserver__ = !0),
        requestAnimationFrame(() => {
          o.__preventObserver__ = !1;
        }),
        T &&
          w.forEach((e) => {
            (d[e].swiperLoopMoveDOM = !0),
              u.prepend(d[e]),
              (d[e].swiperLoopMoveDOM = !1);
          }),
        E &&
          y.forEach((e) => {
            (d[e].swiperLoopMoveDOM = !0),
              u.append(d[e]),
              (d[e].swiperLoopMoveDOM = !1);
          }),
        o.recalcSlides(),
        "auto" === h.slidesPerView
          ? o.updateSlides()
          : S &&
            ((w.length > 0 && T) || (y.length > 0 && E)) &&
            o.slides.forEach((e, t) => {
              o.grid.updateSlide(t, e, o.slides);
            }),
        h.watchSlidesProgress && o.updateSlidesOffset(),
        s)
      )
        if (w.length > 0 && T) {
          if (void 0 === t) {
            const e = o.slidesGrid[b],
              t = o.slidesGrid[b + x] - e;
            l
              ? o.setTranslate(o.translate - t)
              : (o.slideTo(b + x, 0, !1, !0),
                a &&
                  ((o.touchEventsData.startTranslate =
                    o.touchEventsData.startTranslate - t),
                  (o.touchEventsData.currentTranslate =
                    o.touchEventsData.currentTranslate - t)));
          } else if (a) {
            const e = S ? w.length / h.grid.rows : w.length;
            o.slideTo(o.activeIndex + e, 0, !1, !0),
              (o.touchEventsData.currentTranslate = o.translate);
          }
        } else if (y.length > 0 && E)
          if (void 0 === t) {
            const e = o.slidesGrid[b],
              t = o.slidesGrid[b - C] - e;
            l
              ? o.setTranslate(o.translate - t)
              : (o.slideTo(b - C, 0, !1, !0),
                a &&
                  ((o.touchEventsData.startTranslate =
                    o.touchEventsData.startTranslate - t),
                  (o.touchEventsData.currentTranslate =
                    o.touchEventsData.currentTranslate - t)));
          } else {
            const e = S ? y.length / h.grid.rows : y.length;
            o.slideTo(o.activeIndex - e, 0, !1, !0);
          }
      if (
        ((o.allowSlidePrev = c),
        (o.allowSlideNext = p),
        o.controller && o.controller.control && !r)
      ) {
        const e = {
          slideRealIndex: t,
          direction: i,
          setTranslate: a,
          activeSlideIndex: n,
          byController: !0,
        };
        Array.isArray(o.controller.control)
          ? o.controller.control.forEach((t) => {
              !t.destroyed &&
                t.params.loop &&
                t.loopFix({
                  ...e,
                  slideTo: t.params.slidesPerView === h.slidesPerView && s,
                });
            })
          : o.controller.control instanceof o.constructor &&
            o.controller.control.params.loop &&
            o.controller.control.loopFix({
              ...e,
              slideTo:
                o.controller.control.params.slidesPerView === h.slidesPerView &&
                s,
            });
      }
      o.emit("loopFix");
    },
    loopDestroy: function () {
      const e = this,
        { params: t, slidesEl: s } = e;
      if (!t.loop || (e.virtual && e.params.virtual.enabled)) return;
      e.recalcSlides();
      const i = [];
      e.slides.forEach((e) => {
        const t =
          void 0 === e.swiperSlideIndex
            ? 1 * e.getAttribute("data-swiper-slide-index")
            : e.swiperSlideIndex;
        i[t] = e;
      }),
        e.slides.forEach((e) => {
          e.removeAttribute("data-swiper-slide-index");
        }),
        i.forEach((e) => {
          s.append(e);
        }),
        e.recalcSlides(),
        e.slideTo(e.realIndex, 0);
    },
  };
  function Q(e, t, s) {
    const i = E(),
      { params: a } = e,
      n = a.edgeSwipeDetection,
      r = a.edgeSwipeThreshold;
    return (
      !n ||
      !(s <= r || s >= i.innerWidth - r) ||
      ("prevent" === n && (t.preventDefault(), !0))
    );
  }
  function J(e) {
    const t = this,
      s = y();
    let i = e;
    i.originalEvent && (i = i.originalEvent);
    const a = t.touchEventsData;
    if ("pointerdown" === i.type) {
      if (null !== a.pointerId && a.pointerId !== i.pointerId) return;
      a.pointerId = i.pointerId;
    } else
      "touchstart" === i.type &&
        1 === i.targetTouches.length &&
        (a.touchId = i.targetTouches[0].identifier);
    if ("touchstart" === i.type) return void Q(t, i, i.targetTouches[0].pageX);
    const { params: n, touches: r, enabled: l } = t;
    if (!l) return;
    if (!n.simulateTouch && "mouse" === i.pointerType) return;
    if (t.animating && n.preventInteractionOnTransition) return;
    !t.animating && n.cssMode && n.loop && t.loopFix();
    let o = i.target;
    if ("wrapper" === n.touchEventsTarget && !t.wrapperEl.contains(o)) return;
    if ("which" in i && 3 === i.which) return;
    if ("button" in i && i.button > 0) return;
    if (a.isTouched && a.isMoved) return;
    const d = !!n.noSwipingClass && "" !== n.noSwipingClass,
      c = i.composedPath ? i.composedPath() : i.path;
    d && i.target && i.target.shadowRoot && c && (o = c[0]);
    const p = n.noSwipingSelector
        ? n.noSwipingSelector
        : `.${n.noSwipingClass}`,
      u = !(!i.target || !i.target.shadowRoot);
    if (
      n.noSwiping &&
      (u
        ? (function (e, t) {
            return (
              void 0 === t && (t = this),
              (function t(s) {
                if (!s || s === y() || s === E()) return null;
                s.assignedSlot && (s = s.assignedSlot);
                const i = s.closest(e);
                return i || s.getRootNode ? i || t(s.getRootNode().host) : null;
              })(t)
            );
          })(p, o)
        : o.closest(p))
    )
      return void (t.allowClick = !0);
    if (n.swipeHandler && !o.closest(n.swipeHandler)) return;
    (r.currentX = i.pageX), (r.currentY = i.pageY);
    const h = r.currentX,
      m = r.currentY;
    if (!Q(t, i, h)) return;
    Object.assign(a, {
      isTouched: !0,
      isMoved: !1,
      allowTouchCallbacks: !0,
      isScrolling: void 0,
      startMoving: void 0,
    }),
      (r.startX = h),
      (r.startY = m),
      (a.touchStartTime = x()),
      (t.allowClick = !0),
      t.updateSize(),
      (t.swipeDirection = void 0),
      n.threshold > 0 && (a.allowThresholdMove = !1);
    let f = !0;
    o.matches(a.focusableElements) &&
      ((f = !1), "SELECT" === o.nodeName && (a.isTouched = !1)),
      s.activeElement &&
        s.activeElement.matches(a.focusableElements) &&
        s.activeElement !== o &&
        s.activeElement.blur();
    const g = f && t.allowTouchMove && n.touchStartPreventDefault;
    (!n.touchStartForcePreventDefault && !g) ||
      o.isContentEditable ||
      i.preventDefault(),
      n.freeMode &&
        n.freeMode.enabled &&
        t.freeMode &&
        t.animating &&
        !n.cssMode &&
        t.freeMode.onTouchStart(),
      t.emit("touchStart", i);
  }
  function ee(e) {
    const t = y(),
      s = this,
      i = s.touchEventsData,
      { params: a, touches: n, rtlTranslate: r, enabled: l } = s;
    if (!l) return;
    if (!a.simulateTouch && "mouse" === e.pointerType) return;
    let o,
      d = e;
    if ((d.originalEvent && (d = d.originalEvent), "pointermove" === d.type)) {
      if (null !== i.touchId) return;
      if (d.pointerId !== i.pointerId) return;
    }
    if ("touchmove" === d.type) {
      if (
        ((o = [...d.changedTouches].filter(
          (e) => e.identifier === i.touchId,
        )[0]),
        !o || o.identifier !== i.touchId)
      )
        return;
    } else o = d;
    if (!i.isTouched)
      return void (
        i.startMoving &&
        i.isScrolling &&
        s.emit("touchMoveOpposite", d)
      );
    const c = o.pageX,
      p = o.pageY;
    if (d.preventedByNestedSwiper) return (n.startX = c), void (n.startY = p);
    if (!s.allowTouchMove)
      return (
        d.target.matches(i.focusableElements) || (s.allowClick = !1),
        void (
          i.isTouched &&
          (Object.assign(n, { startX: c, startY: p, currentX: c, currentY: p }),
          (i.touchStartTime = x()))
        )
      );
    if (a.touchReleaseOnEdges && !a.loop)
      if (s.isVertical()) {
        if (
          (p < n.startY && s.translate <= s.maxTranslate()) ||
          (p > n.startY && s.translate >= s.minTranslate())
        )
          return (i.isTouched = !1), void (i.isMoved = !1);
      } else if (
        (c < n.startX && s.translate <= s.maxTranslate()) ||
        (c > n.startX && s.translate >= s.minTranslate())
      )
        return;
    if (
      t.activeElement &&
      d.target === t.activeElement &&
      d.target.matches(i.focusableElements)
    )
      return (i.isMoved = !0), void (s.allowClick = !1);
    i.allowTouchCallbacks && s.emit("touchMove", d),
      (n.previousX = n.currentX),
      (n.previousY = n.currentY),
      (n.currentX = c),
      (n.currentY = p);
    const u = n.currentX - n.startX,
      h = n.currentY - n.startY;
    if (s.params.threshold && Math.sqrt(u ** 2 + h ** 2) < s.params.threshold)
      return;
    if (void 0 === i.isScrolling) {
      let e;
      (s.isHorizontal() && n.currentY === n.startY) ||
      (s.isVertical() && n.currentX === n.startX)
        ? (i.isScrolling = !1)
        : u * u + h * h >= 25 &&
          ((e = (180 * Math.atan2(Math.abs(h), Math.abs(u))) / Math.PI),
          (i.isScrolling = s.isHorizontal()
            ? e > a.touchAngle
            : 90 - e > a.touchAngle));
    }
    if (
      (i.isScrolling && s.emit("touchMoveOpposite", d),
      void 0 === i.startMoving &&
        ((n.currentX === n.startX && n.currentY === n.startY) ||
          (i.startMoving = !0)),
      i.isScrolling)
    )
      return void (i.isTouched = !1);
    if (!i.startMoving) return;
    (s.allowClick = !1),
      !a.cssMode && d.cancelable && d.preventDefault(),
      a.touchMoveStopPropagation && !a.nested && d.stopPropagation();
    let m = s.isHorizontal() ? u : h,
      f = s.isHorizontal()
        ? n.currentX - n.previousX
        : n.currentY - n.previousY;
    a.oneWayMovement &&
      ((m = Math.abs(m) * (r ? 1 : -1)), (f = Math.abs(f) * (r ? 1 : -1))),
      (n.diff = m),
      (m *= a.touchRatio),
      r && ((m = -m), (f = -f));
    const g = s.touchesDirection;
    (s.swipeDirection = m > 0 ? "prev" : "next"),
      (s.touchesDirection = f > 0 ? "prev" : "next");
    const v = s.params.loop && !a.cssMode,
      S =
        ("next" === s.touchesDirection && s.allowSlideNext) ||
        ("prev" === s.touchesDirection && s.allowSlidePrev);
    if (!i.isMoved) {
      if (
        (v && S && s.loopFix({ direction: s.swipeDirection }),
        (i.startTranslate = s.getTranslate()),
        s.setTransition(0),
        s.animating)
      ) {
        const e = new window.CustomEvent("transitionend", {
          bubbles: !0,
          cancelable: !0,
        });
        s.wrapperEl.dispatchEvent(e);
      }
      (i.allowMomentumBounce = !1),
        !a.grabCursor ||
          (!0 !== s.allowSlideNext && !0 !== s.allowSlidePrev) ||
          s.setGrabCursor(!0),
        s.emit("sliderFirstMove", d);
    }
    if (
      (new Date().getTime(),
      i.isMoved &&
        i.allowThresholdMove &&
        g !== s.touchesDirection &&
        v &&
        S &&
        Math.abs(m) >= 1)
    )
      return (
        Object.assign(n, {
          startX: c,
          startY: p,
          currentX: c,
          currentY: p,
          startTranslate: i.currentTranslate,
        }),
        (i.loopSwapReset = !0),
        void (i.startTranslate = i.currentTranslate)
      );
    s.emit("sliderMove", d),
      (i.isMoved = !0),
      (i.currentTranslate = m + i.startTranslate);
    let w = !0,
      b = a.resistanceRatio;
    if (
      (a.touchReleaseOnEdges && (b = 0),
      m > 0
        ? (v &&
            S &&
            i.allowThresholdMove &&
            i.currentTranslate >
              (a.centeredSlides
                ? s.minTranslate() - s.slidesSizesGrid[s.activeIndex + 1]
                : s.minTranslate()) &&
            s.loopFix({
              direction: "prev",
              setTranslate: !0,
              activeSlideIndex: 0,
            }),
          i.currentTranslate > s.minTranslate() &&
            ((w = !1),
            a.resistance &&
              (i.currentTranslate =
                s.minTranslate() -
                1 +
                (-s.minTranslate() + i.startTranslate + m) ** b)))
        : m < 0 &&
          (v &&
            S &&
            i.allowThresholdMove &&
            i.currentTranslate <
              (a.centeredSlides
                ? s.maxTranslate() +
                  s.slidesSizesGrid[s.slidesSizesGrid.length - 1]
                : s.maxTranslate()) &&
            s.loopFix({
              direction: "next",
              setTranslate: !0,
              activeSlideIndex:
                s.slides.length -
                ("auto" === a.slidesPerView
                  ? s.slidesPerViewDynamic()
                  : Math.ceil(parseFloat(a.slidesPerView, 10))),
            }),
          i.currentTranslate < s.maxTranslate() &&
            ((w = !1),
            a.resistance &&
              (i.currentTranslate =
                s.maxTranslate() +
                1 -
                (s.maxTranslate() - i.startTranslate - m) ** b))),
      w && (d.preventedByNestedSwiper = !0),
      !s.allowSlideNext &&
        "next" === s.swipeDirection &&
        i.currentTranslate < i.startTranslate &&
        (i.currentTranslate = i.startTranslate),
      !s.allowSlidePrev &&
        "prev" === s.swipeDirection &&
        i.currentTranslate > i.startTranslate &&
        (i.currentTranslate = i.startTranslate),
      s.allowSlidePrev ||
        s.allowSlideNext ||
        (i.currentTranslate = i.startTranslate),
      a.threshold > 0)
    ) {
      if (!(Math.abs(m) > a.threshold || i.allowThresholdMove))
        return void (i.currentTranslate = i.startTranslate);
      if (!i.allowThresholdMove)
        return (
          (i.allowThresholdMove = !0),
          (n.startX = n.currentX),
          (n.startY = n.currentY),
          (i.currentTranslate = i.startTranslate),
          void (n.diff = s.isHorizontal()
            ? n.currentX - n.startX
            : n.currentY - n.startY)
        );
    }
    a.followFinger &&
      !a.cssMode &&
      (((a.freeMode && a.freeMode.enabled && s.freeMode) ||
        a.watchSlidesProgress) &&
        (s.updateActiveIndex(), s.updateSlidesClasses()),
      a.freeMode &&
        a.freeMode.enabled &&
        s.freeMode &&
        s.freeMode.onTouchMove(),
      s.updateProgress(i.currentTranslate),
      s.setTranslate(i.currentTranslate));
  }
  function te(e) {
    const t = this,
      s = t.touchEventsData;
    let i,
      a = e;
    a.originalEvent && (a = a.originalEvent);
    if ("touchend" === a.type || "touchcancel" === a.type) {
      if (
        ((i = [...a.changedTouches].filter(
          (e) => e.identifier === s.touchId,
        )[0]),
        !i || i.identifier !== s.touchId)
      )
        return;
    } else {
      if (null !== s.touchId) return;
      if (a.pointerId !== s.pointerId) return;
      i = a;
    }
    if (
      ["pointercancel", "pointerout", "pointerleave", "contextmenu"].includes(
        a.type,
      )
    ) {
      if (
        !(
          ["pointercancel", "contextmenu"].includes(a.type) &&
          (t.browser.isSafari || t.browser.isWebView)
        )
      )
        return;
    }
    (s.pointerId = null), (s.touchId = null);
    const {
      params: n,
      touches: r,
      rtlTranslate: l,
      slidesGrid: o,
      enabled: d,
    } = t;
    if (!d) return;
    if (!n.simulateTouch && "mouse" === a.pointerType) return;
    if (
      (s.allowTouchCallbacks && t.emit("touchEnd", a),
      (s.allowTouchCallbacks = !1),
      !s.isTouched)
    )
      return (
        s.isMoved && n.grabCursor && t.setGrabCursor(!1),
        (s.isMoved = !1),
        void (s.startMoving = !1)
      );
    n.grabCursor &&
      s.isMoved &&
      s.isTouched &&
      (!0 === t.allowSlideNext || !0 === t.allowSlidePrev) &&
      t.setGrabCursor(!1);
    const c = x(),
      p = c - s.touchStartTime;
    if (t.allowClick) {
      const e = a.path || (a.composedPath && a.composedPath());
      t.updateClickedSlide((e && e[0]) || a.target, e),
        t.emit("tap click", a),
        p < 300 &&
          c - s.lastClickTime < 300 &&
          t.emit("doubleTap doubleClick", a);
    }
    if (
      ((s.lastClickTime = x()),
      T(() => {
        t.destroyed || (t.allowClick = !0);
      }),
      !s.isTouched ||
        !s.isMoved ||
        !t.swipeDirection ||
        (0 === r.diff && !s.loopSwapReset) ||
        (s.currentTranslate === s.startTranslate && !s.loopSwapReset))
    )
      return (s.isTouched = !1), (s.isMoved = !1), void (s.startMoving = !1);
    let u;
    if (
      ((s.isTouched = !1),
      (s.isMoved = !1),
      (s.startMoving = !1),
      (u = n.followFinger
        ? l
          ? t.translate
          : -t.translate
        : -s.currentTranslate),
      n.cssMode)
    )
      return;
    if (n.freeMode && n.freeMode.enabled)
      return void t.freeMode.onTouchEnd({ currentPos: u });
    const h = u >= -t.maxTranslate() && !t.params.loop;
    let m = 0,
      f = t.slidesSizesGrid[0];
    for (
      let e = 0;
      e < o.length;
      e += e < n.slidesPerGroupSkip ? 1 : n.slidesPerGroup
    ) {
      const t = e < n.slidesPerGroupSkip - 1 ? 1 : n.slidesPerGroup;
      void 0 !== o[e + t]
        ? (h || (u >= o[e] && u < o[e + t])) && ((m = e), (f = o[e + t] - o[e]))
        : (h || u >= o[e]) &&
          ((m = e), (f = o[o.length - 1] - o[o.length - 2]));
    }
    let g = null,
      v = null;
    n.rewind &&
      (t.isBeginning
        ? (v =
            n.virtual && n.virtual.enabled && t.virtual
              ? t.virtual.slides.length - 1
              : t.slides.length - 1)
        : t.isEnd && (g = 0));
    const S = (u - o[m]) / f,
      w = m < n.slidesPerGroupSkip - 1 ? 1 : n.slidesPerGroup;
    if (p > n.longSwipesMs) {
      if (!n.longSwipes) return void t.slideTo(t.activeIndex);
      "next" === t.swipeDirection &&
        (S >= n.longSwipesRatio
          ? t.slideTo(n.rewind && t.isEnd ? g : m + w)
          : t.slideTo(m)),
        "prev" === t.swipeDirection &&
          (S > 1 - n.longSwipesRatio
            ? t.slideTo(m + w)
            : null !== v && S < 0 && Math.abs(S) > n.longSwipesRatio
              ? t.slideTo(v)
              : t.slideTo(m));
    } else {
      if (!n.shortSwipes) return void t.slideTo(t.activeIndex);
      t.navigation &&
      (a.target === t.navigation.nextEl || a.target === t.navigation.prevEl)
        ? a.target === t.navigation.nextEl
          ? t.slideTo(m + w)
          : t.slideTo(m)
        : ("next" === t.swipeDirection && t.slideTo(null !== g ? g : m + w),
          "prev" === t.swipeDirection && t.slideTo(null !== v ? v : m));
    }
  }
  function se() {
    const e = this,
      { params: t, el: s } = e;
    if (s && 0 === s.offsetWidth) return;
    t.breakpoints && e.setBreakpoint();
    const { allowSlideNext: i, allowSlidePrev: a, snapGrid: n } = e,
      r = e.virtual && e.params.virtual.enabled;
    (e.allowSlideNext = !0),
      (e.allowSlidePrev = !0),
      e.updateSize(),
      e.updateSlides(),
      e.updateSlidesClasses();
    const l = r && t.loop;
    !("auto" === t.slidesPerView || t.slidesPerView > 1) ||
    !e.isEnd ||
    e.isBeginning ||
    e.params.centeredSlides ||
    l
      ? e.params.loop && !r
        ? e.slideToLoop(e.realIndex, 0, !1, !0)
        : e.slideTo(e.activeIndex, 0, !1, !0)
      : e.slideTo(e.slides.length - 1, 0, !1, !0),
      e.autoplay &&
        e.autoplay.running &&
        e.autoplay.paused &&
        (clearTimeout(e.autoplay.resizeTimeout),
        (e.autoplay.resizeTimeout = setTimeout(() => {
          e.autoplay &&
            e.autoplay.running &&
            e.autoplay.paused &&
            e.autoplay.resume();
        }, 500))),
      (e.allowSlidePrev = a),
      (e.allowSlideNext = i),
      e.params.watchOverflow && n !== e.snapGrid && e.checkOverflow();
  }
  function ie(e) {
    const t = this;
    t.enabled &&
      (t.allowClick ||
        (t.params.preventClicks && e.preventDefault(),
        t.params.preventClicksPropagation &&
          t.animating &&
          (e.stopPropagation(), e.stopImmediatePropagation())));
  }
  function ae() {
    const e = this,
      { wrapperEl: t, rtlTranslate: s, enabled: i } = e;
    if (!i) return;
    let a;
    (e.previousTranslate = e.translate),
      e.isHorizontal()
        ? (e.translate = -t.scrollLeft)
        : (e.translate = -t.scrollTop),
      0 === e.translate && (e.translate = 0),
      e.updateActiveIndex(),
      e.updateSlidesClasses();
    const n = e.maxTranslate() - e.minTranslate();
    (a = 0 === n ? 0 : (e.translate - e.minTranslate()) / n),
      a !== e.progress && e.updateProgress(s ? -e.translate : e.translate),
      e.emit("setTranslate", e.translate, !1);
  }
  function ne(e) {
    const t = this;
    H(t, e.target),
      t.params.cssMode ||
        ("auto" !== t.params.slidesPerView && !t.params.autoHeight) ||
        t.update();
  }
  function re() {
    const e = this;
    e.documentTouchHandlerProceeded ||
      ((e.documentTouchHandlerProceeded = !0),
      e.params.touchReleaseOnEdges && (e.el.style.touchAction = "auto"));
  }
  const le = (e, t) => {
    const s = y(),
      { params: i, el: a, wrapperEl: n, device: r } = e,
      l = !!i.nested,
      o = "on" === t ? "addEventListener" : "removeEventListener",
      d = t;
    s[o]("touchstart", e.onDocumentTouchStart, { passive: !1, capture: l }),
      a[o]("touchstart", e.onTouchStart, { passive: !1 }),
      a[o]("pointerdown", e.onTouchStart, { passive: !1 }),
      s[o]("touchmove", e.onTouchMove, { passive: !1, capture: l }),
      s[o]("pointermove", e.onTouchMove, { passive: !1, capture: l }),
      s[o]("touchend", e.onTouchEnd, { passive: !0 }),
      s[o]("pointerup", e.onTouchEnd, { passive: !0 }),
      s[o]("pointercancel", e.onTouchEnd, { passive: !0 }),
      s[o]("touchcancel", e.onTouchEnd, { passive: !0 }),
      s[o]("pointerout", e.onTouchEnd, { passive: !0 }),
      s[o]("pointerleave", e.onTouchEnd, { passive: !0 }),
      s[o]("contextmenu", e.onTouchEnd, { passive: !0 }),
      (i.preventClicks || i.preventClicksPropagation) &&
        a[o]("click", e.onClick, !0),
      i.cssMode && n[o]("scroll", e.onScroll),
      i.updateOnWindowResize
        ? e[d](
            r.ios || r.android
              ? "resize orientationchange observerUpdate"
              : "resize observerUpdate",
            se,
            !0,
          )
        : e[d]("observerUpdate", se, !0),
      a[o]("load", e.onLoad, { capture: !0 });
  };
  const oe = (e, t) => e.grid && t.grid && t.grid.rows > 1;
  var de = {
    init: !0,
    direction: "horizontal",
    oneWayMovement: !1,
    touchEventsTarget: "wrapper",
    initialSlide: 0,
    speed: 300,
    cssMode: !1,
    updateOnWindowResize: !0,
    resizeObserver: !0,
    nested: !1,
    createElements: !1,
    eventsPrefix: "swiper",
    enabled: !0,
    focusableElements: "input, select, option, textarea, button, video, label",
    width: null,
    height: null,
    preventInteractionOnTransition: !1,
    userAgent: null,
    url: null,
    edgeSwipeDetection: !1,
    edgeSwipeThreshold: 20,
    autoHeight: !1,
    setWrapperSize: !1,
    virtualTranslate: !1,
    effect: "slide",
    breakpoints: void 0,
    breakpointsBase: "window",
    spaceBetween: 0,
    slidesPerView: 1,
    slidesPerGroup: 1,
    slidesPerGroupSkip: 0,
    slidesPerGroupAuto: !1,
    centeredSlides: !1,
    centeredSlidesBounds: !1,
    slidesOffsetBefore: 0,
    slidesOffsetAfter: 0,
    normalizeSlideIndex: !0,
    centerInsufficientSlides: !1,
    watchOverflow: !0,
    roundLengths: !1,
    touchRatio: 1,
    touchAngle: 45,
    simulateTouch: !0,
    shortSwipes: !0,
    longSwipes: !0,
    longSwipesRatio: 0.5,
    longSwipesMs: 300,
    followFinger: !0,
    allowTouchMove: !0,
    threshold: 5,
    touchMoveStopPropagation: !1,
    touchStartPreventDefault: !0,
    touchStartForcePreventDefault: !1,
    touchReleaseOnEdges: !1,
    uniqueNavElements: !0,
    resistance: !0,
    resistanceRatio: 0.85,
    watchSlidesProgress: !1,
    grabCursor: !1,
    preventClicks: !0,
    preventClicksPropagation: !0,
    slideToClickedSlide: !1,
    loop: !1,
    loopAddBlankSlides: !0,
    loopAdditionalSlides: 0,
    loopPreventsSliding: !0,
    rewind: !1,
    allowSlidePrev: !0,
    allowSlideNext: !0,
    swipeHandler: null,
    noSwiping: !0,
    noSwipingClass: "swiper-no-swiping",
    noSwipingSelector: null,
    passiveListeners: !0,
    maxBackfaceHiddenSlides: 10,
    containerModifierClass: "swiper-",
    slideClass: "swiper-slide",
    slideBlankClass: "swiper-slide-blank",
    slideActiveClass: "swiper-slide-active",
    slideVisibleClass: "swiper-slide-visible",
    slideFullyVisibleClass: "swiper-slide-fully-visible",
    slideNextClass: "swiper-slide-next",
    slidePrevClass: "swiper-slide-prev",
    wrapperClass: "swiper-wrapper",
    lazyPreloaderClass: "swiper-lazy-preloader",
    lazyPreloadPrevNext: 0,
    runCallbacksOnInit: !0,
    _emitClasses: !1,
  };
  function ce(e, t) {
    return function (s) {
      void 0 === s && (s = {});
      const i = Object.keys(s)[0],
        a = s[i];
      "object" == typeof a && null !== a
        ? (!0 === e[i] && (e[i] = { enabled: !0 }),
          "navigation" === i &&
            e[i] &&
            e[i].enabled &&
            !e[i].prevEl &&
            !e[i].nextEl &&
            (e[i].auto = !0),
          ["pagination", "scrollbar"].indexOf(i) >= 0 &&
            e[i] &&
            e[i].enabled &&
            !e[i].el &&
            (e[i].auto = !0),
          i in e && "enabled" in a
            ? ("object" != typeof e[i] ||
                "enabled" in e[i] ||
                (e[i].enabled = !0),
              e[i] || (e[i] = { enabled: !1 }),
              A(t, s))
            : A(t, s))
        : A(t, s);
    };
  }
  const pe = {
      eventsEmitter: W,
      update: Y,
      translate: X,
      transition: {
        setTransition: function (e, t) {
          const s = this;
          s.params.cssMode ||
            ((s.wrapperEl.style.transitionDuration = `${e}ms`),
            (s.wrapperEl.style.transitionDelay = 0 === e ? "0ms" : "")),
            s.emit("setTransition", e, t);
        },
        transitionStart: function (e, t) {
          void 0 === e && (e = !0);
          const s = this,
            { params: i } = s;
          i.cssMode ||
            (i.autoHeight && s.updateAutoHeight(),
            U({ swiper: s, runCallbacks: e, direction: t, step: "Start" }));
        },
        transitionEnd: function (e, t) {
          void 0 === e && (e = !0);
          const s = this,
            { params: i } = s;
          (s.animating = !1),
            i.cssMode ||
              (s.setTransition(0),
              U({ swiper: s, runCallbacks: e, direction: t, step: "End" }));
        },
      },
      slide: Z,
      loop: K,
      grabCursor: {
        setGrabCursor: function (e) {
          const t = this;
          if (
            !t.params.simulateTouch ||
            (t.params.watchOverflow && t.isLocked) ||
            t.params.cssMode
          )
            return;
          const s =
            "container" === t.params.touchEventsTarget ? t.el : t.wrapperEl;
          t.isElement && (t.__preventObserver__ = !0),
            (s.style.cursor = "move"),
            (s.style.cursor = e ? "grabbing" : "grab"),
            t.isElement &&
              requestAnimationFrame(() => {
                t.__preventObserver__ = !1;
              });
        },
        unsetGrabCursor: function () {
          const e = this;
          (e.params.watchOverflow && e.isLocked) ||
            e.params.cssMode ||
            (e.isElement && (e.__preventObserver__ = !0),
            (e[
              "container" === e.params.touchEventsTarget ? "el" : "wrapperEl"
            ].style.cursor = ""),
            e.isElement &&
              requestAnimationFrame(() => {
                e.__preventObserver__ = !1;
              }));
        },
      },
      events: {
        attachEvents: function () {
          const e = this,
            { params: t } = e;
          (e.onTouchStart = J.bind(e)),
            (e.onTouchMove = ee.bind(e)),
            (e.onTouchEnd = te.bind(e)),
            (e.onDocumentTouchStart = re.bind(e)),
            t.cssMode && (e.onScroll = ae.bind(e)),
            (e.onClick = ie.bind(e)),
            (e.onLoad = ne.bind(e)),
            le(e, "on");
        },
        detachEvents: function () {
          le(this, "off");
        },
      },
      breakpoints: {
        setBreakpoint: function () {
          const e = this,
            { realIndex: t, initialized: s, params: i, el: a } = e,
            n = i.breakpoints;
          if (!n || (n && 0 === Object.keys(n).length)) return;
          const r = e.getBreakpoint(n, e.params.breakpointsBase, e.el);
          if (!r || e.currentBreakpoint === r) return;
          const l = (r in n ? n[r] : void 0) || e.originalParams,
            o = oe(e, i),
            d = oe(e, l),
            c = i.enabled;
          o && !d
            ? (a.classList.remove(
                `${i.containerModifierClass}grid`,
                `${i.containerModifierClass}grid-column`,
              ),
              e.emitContainerClasses())
            : !o &&
              d &&
              (a.classList.add(`${i.containerModifierClass}grid`),
              ((l.grid.fill && "column" === l.grid.fill) ||
                (!l.grid.fill && "column" === i.grid.fill)) &&
                a.classList.add(`${i.containerModifierClass}grid-column`),
              e.emitContainerClasses()),
            ["navigation", "pagination", "scrollbar"].forEach((t) => {
              if (void 0 === l[t]) return;
              const s = i[t] && i[t].enabled,
                a = l[t] && l[t].enabled;
              s && !a && e[t].disable(), !s && a && e[t].enable();
            });
          const p = l.direction && l.direction !== i.direction,
            u = i.loop && (l.slidesPerView !== i.slidesPerView || p),
            h = i.loop;
          p && s && e.changeDirection(), A(e.params, l);
          const m = e.params.enabled,
            f = e.params.loop;
          Object.assign(e, {
            allowTouchMove: e.params.allowTouchMove,
            allowSlideNext: e.params.allowSlideNext,
            allowSlidePrev: e.params.allowSlidePrev,
          }),
            c && !m ? e.disable() : !c && m && e.enable(),
            (e.currentBreakpoint = r),
            e.emit("_beforeBreakpoint", l),
            s &&
              (u
                ? (e.loopDestroy(), e.loopCreate(t), e.updateSlides())
                : !h && f
                  ? (e.loopCreate(t), e.updateSlides())
                  : h && !f && e.loopDestroy()),
            e.emit("breakpoint", l);
        },
        getBreakpoint: function (e, t, s) {
          if ((void 0 === t && (t = "window"), !e || ("container" === t && !s)))
            return;
          let i = !1;
          const a = E(),
            n = "window" === t ? a.innerHeight : s.clientHeight,
            r = Object.keys(e).map((e) => {
              if ("string" == typeof e && 0 === e.indexOf("@")) {
                const t = parseFloat(e.substr(1));
                return { value: n * t, point: e };
              }
              return { value: e, point: e };
            });
          r.sort((e, t) => parseInt(e.value, 10) - parseInt(t.value, 10));
          for (let e = 0; e < r.length; e += 1) {
            const { point: n, value: l } = r[e];
            "window" === t
              ? a.matchMedia(`(min-width: ${l}px)`).matches && (i = n)
              : l <= s.clientWidth && (i = n);
          }
          return i || "max";
        },
      },
      checkOverflow: {
        checkOverflow: function () {
          const e = this,
            { isLocked: t, params: s } = e,
            { slidesOffsetBefore: i } = s;
          if (i) {
            const t = e.slides.length - 1,
              s = e.slidesGrid[t] + e.slidesSizesGrid[t] + 2 * i;
            e.isLocked = e.size > s;
          } else e.isLocked = 1 === e.snapGrid.length;
          !0 === s.allowSlideNext && (e.allowSlideNext = !e.isLocked),
            !0 === s.allowSlidePrev && (e.allowSlidePrev = !e.isLocked),
            t && t !== e.isLocked && (e.isEnd = !1),
            t !== e.isLocked && e.emit(e.isLocked ? "lock" : "unlock");
        },
      },
      classes: {
        addClasses: function () {
          const e = this,
            { classNames: t, params: s, rtl: i, el: a, device: n } = e,
            r = (function (e, t) {
              const s = [];
              return (
                e.forEach((e) => {
                  "object" == typeof e
                    ? Object.keys(e).forEach((i) => {
                        e[i] && s.push(t + i);
                      })
                    : "string" == typeof e && s.push(t + e);
                }),
                s
              );
            })(
              [
                "initialized",
                s.direction,
                { "free-mode": e.params.freeMode && s.freeMode.enabled },
                { autoheight: s.autoHeight },
                { rtl: i },
                { grid: s.grid && s.grid.rows > 1 },
                {
                  "grid-column":
                    s.grid && s.grid.rows > 1 && "column" === s.grid.fill,
                },
                { android: n.android },
                { ios: n.ios },
                { "css-mode": s.cssMode },
                { centered: s.cssMode && s.centeredSlides },
                { "watch-progress": s.watchSlidesProgress },
              ],
              s.containerModifierClass,
            );
          t.push(...r), a.classList.add(...t), e.emitContainerClasses();
        },
        removeClasses: function () {
          const { el: e, classNames: t } = this;
          e.classList.remove(...t), this.emitContainerClasses();
        },
      },
    },
    ue = {};
  class he {
    constructor() {
      let e, t;
      for (var s = arguments.length, i = new Array(s), a = 0; a < s; a++)
        i[a] = arguments[a];
      1 === i.length &&
      i[0].constructor &&
      "Object" === Object.prototype.toString.call(i[0]).slice(8, -1)
        ? (t = i[0])
        : ([e, t] = i),
        t || (t = {}),
        (t = A({}, t)),
        e && !t.el && (t.el = e);
      const n = y();
      if (
        t.el &&
        "string" == typeof t.el &&
        n.querySelectorAll(t.el).length > 1
      ) {
        const e = [];
        return (
          n.querySelectorAll(t.el).forEach((s) => {
            const i = A({}, t, { el: s });
            e.push(new he(i));
          }),
          e
        );
      }
      const r = this;
      (r.__swiper__ = !0),
        (r.support = V()),
        (r.device = N({ userAgent: t.userAgent })),
        (r.browser = F()),
        (r.eventsListeners = {}),
        (r.eventsAnyListeners = []),
        (r.modules = [...r.__modules__]),
        t.modules && Array.isArray(t.modules) && r.modules.push(...t.modules);
      const l = {};
      r.modules.forEach((e) => {
        e({
          params: t,
          swiper: r,
          extendParams: ce(t, l),
          on: r.on.bind(r),
          once: r.once.bind(r),
          off: r.off.bind(r),
          emit: r.emit.bind(r),
        });
      });
      const o = A({}, de, l);
      return (
        (r.params = A({}, o, ue, t)),
        (r.originalParams = A({}, r.params)),
        (r.passedParams = A({}, t)),
        r.params &&
          r.params.on &&
          Object.keys(r.params.on).forEach((e) => {
            r.on(e, r.params.on[e]);
          }),
        r.params && r.params.onAny && r.onAny(r.params.onAny),
        Object.assign(r, {
          enabled: r.params.enabled,
          el: e,
          classNames: [],
          slides: [],
          slidesGrid: [],
          snapGrid: [],
          slidesSizesGrid: [],
          isHorizontal: () => "horizontal" === r.params.direction,
          isVertical: () => "vertical" === r.params.direction,
          activeIndex: 0,
          realIndex: 0,
          isBeginning: !0,
          isEnd: !1,
          translate: 0,
          previousTranslate: 0,
          progress: 0,
          velocity: 0,
          animating: !1,
          cssOverflowAdjustment() {
            return Math.trunc(this.translate / 2 ** 23) * 2 ** 23;
          },
          allowSlideNext: r.params.allowSlideNext,
          allowSlidePrev: r.params.allowSlidePrev,
          touchEventsData: {
            isTouched: void 0,
            isMoved: void 0,
            allowTouchCallbacks: void 0,
            touchStartTime: void 0,
            isScrolling: void 0,
            currentTranslate: void 0,
            startTranslate: void 0,
            allowThresholdMove: void 0,
            focusableElements: r.params.focusableElements,
            lastClickTime: 0,
            clickTimeout: void 0,
            velocities: [],
            allowMomentumBounce: void 0,
            startMoving: void 0,
            pointerId: null,
            touchId: null,
          },
          allowClick: !0,
          allowTouchMove: r.params.allowTouchMove,
          touches: { startX: 0, startY: 0, currentX: 0, currentY: 0, diff: 0 },
          imagesToLoad: [],
          imagesLoaded: 0,
        }),
        r.emit("_swiper"),
        r.params.init && r.init(),
        r
      );
    }
    getDirectionLabel(e) {
      return this.isHorizontal()
        ? e
        : {
            width: "height",
            "margin-top": "margin-left",
            "margin-bottom ": "margin-right",
            "margin-left": "margin-top",
            "margin-right": "margin-bottom",
            "padding-left": "padding-top",
            "padding-right": "padding-bottom",
            marginRight: "marginBottom",
          }[e];
    }
    getSlideIndex(e) {
      const { slidesEl: t, params: s } = this,
        i = D(M(t, `.${s.slideClass}, swiper-slide`)[0]);
      return D(e) - i;
    }
    getSlideIndexByData(e) {
      return this.getSlideIndex(
        this.slides.filter(
          (t) => 1 * t.getAttribute("data-swiper-slide-index") === e,
        )[0],
      );
    }
    recalcSlides() {
      const { slidesEl: e, params: t } = this;
      this.slides = M(e, `.${t.slideClass}, swiper-slide`);
    }
    enable() {
      const e = this;
      e.enabled ||
        ((e.enabled = !0),
        e.params.grabCursor && e.setGrabCursor(),
        e.emit("enable"));
    }
    disable() {
      const e = this;
      e.enabled &&
        ((e.enabled = !1),
        e.params.grabCursor && e.unsetGrabCursor(),
        e.emit("disable"));
    }
    setProgress(e, t) {
      const s = this;
      e = Math.min(Math.max(e, 0), 1);
      const i = s.minTranslate(),
        a = (s.maxTranslate() - i) * e + i;
      s.translateTo(a, void 0 === t ? 0 : t),
        s.updateActiveIndex(),
        s.updateSlidesClasses();
    }
    emitContainerClasses() {
      const e = this;
      if (!e.params._emitClasses || !e.el) return;
      const t = e.el.className
        .split(" ")
        .filter(
          (t) =>
            0 === t.indexOf("swiper") ||
            0 === t.indexOf(e.params.containerModifierClass),
        );
      e.emit("_containerClasses", t.join(" "));
    }
    getSlideClasses(e) {
      const t = this;
      return t.destroyed
        ? ""
        : e.className
            .split(" ")
            .filter(
              (e) =>
                0 === e.indexOf("swiper-slide") ||
                0 === e.indexOf(t.params.slideClass),
            )
            .join(" ");
    }
    emitSlidesClasses() {
      const e = this;
      if (!e.params._emitClasses || !e.el) return;
      const t = [];
      e.slides.forEach((s) => {
        const i = e.getSlideClasses(s);
        t.push({ slideEl: s, classNames: i }), e.emit("_slideClass", s, i);
      }),
        e.emit("_slideClasses", t);
    }
    slidesPerViewDynamic(e, t) {
      void 0 === e && (e = "current"), void 0 === t && (t = !1);
      const {
        params: s,
        slides: i,
        slidesGrid: a,
        slidesSizesGrid: n,
        size: r,
        activeIndex: l,
      } = this;
      let o = 1;
      if ("number" == typeof s.slidesPerView) return s.slidesPerView;
      if (s.centeredSlides) {
        let e,
          t = i[l] ? i[l].swiperSlideSize : 0;
        for (let s = l + 1; s < i.length; s += 1)
          i[s] &&
            !e &&
            ((t += i[s].swiperSlideSize), (o += 1), t > r && (e = !0));
        for (let s = l - 1; s >= 0; s -= 1)
          i[s] &&
            !e &&
            ((t += i[s].swiperSlideSize), (o += 1), t > r && (e = !0));
      } else if ("current" === e)
        for (let e = l + 1; e < i.length; e += 1) {
          (t ? a[e] + n[e] - a[l] < r : a[e] - a[l] < r) && (o += 1);
        }
      else
        for (let e = l - 1; e >= 0; e -= 1) {
          a[l] - a[e] < r && (o += 1);
        }
      return o;
    }
    update() {
      const e = this;
      if (!e || e.destroyed) return;
      const { snapGrid: t, params: s } = e;
      function i() {
        const t = e.rtlTranslate ? -1 * e.translate : e.translate,
          s = Math.min(Math.max(t, e.maxTranslate()), e.minTranslate());
        e.setTranslate(s), e.updateActiveIndex(), e.updateSlidesClasses();
      }
      let a;
      if (
        (s.breakpoints && e.setBreakpoint(),
        [...e.el.querySelectorAll('[loading="lazy"]')].forEach((t) => {
          t.complete && H(e, t);
        }),
        e.updateSize(),
        e.updateSlides(),
        e.updateProgress(),
        e.updateSlidesClasses(),
        s.freeMode && s.freeMode.enabled && !s.cssMode)
      )
        i(), s.autoHeight && e.updateAutoHeight();
      else {
        if (
          ("auto" === s.slidesPerView || s.slidesPerView > 1) &&
          e.isEnd &&
          !s.centeredSlides
        ) {
          const t =
            e.virtual && s.virtual.enabled ? e.virtual.slides : e.slides;
          a = e.slideTo(t.length - 1, 0, !1, !0);
        } else a = e.slideTo(e.activeIndex, 0, !1, !0);
        a || i();
      }
      s.watchOverflow && t !== e.snapGrid && e.checkOverflow(),
        e.emit("update");
    }
    changeDirection(e, t) {
      void 0 === t && (t = !0);
      const s = this,
        i = s.params.direction;
      return (
        e || (e = "horizontal" === i ? "vertical" : "horizontal"),
        e === i ||
          ("horizontal" !== e && "vertical" !== e) ||
          (s.el.classList.remove(`${s.params.containerModifierClass}${i}`),
          s.el.classList.add(`${s.params.containerModifierClass}${e}`),
          s.emitContainerClasses(),
          (s.params.direction = e),
          s.slides.forEach((t) => {
            "vertical" === e ? (t.style.width = "") : (t.style.height = "");
          }),
          s.emit("changeDirection"),
          t && s.update()),
        s
      );
    }
    changeLanguageDirection(e) {
      const t = this;
      (t.rtl && "rtl" === e) ||
        (!t.rtl && "ltr" === e) ||
        ((t.rtl = "rtl" === e),
        (t.rtlTranslate = "horizontal" === t.params.direction && t.rtl),
        t.rtl
          ? (t.el.classList.add(`${t.params.containerModifierClass}rtl`),
            (t.el.dir = "rtl"))
          : (t.el.classList.remove(`${t.params.containerModifierClass}rtl`),
            (t.el.dir = "ltr")),
        t.update());
    }
    mount(e) {
      const t = this;
      if (t.mounted) return !0;
      let s = e || t.params.el;
      if (("string" == typeof s && (s = document.querySelector(s)), !s))
        return !1;
      (s.swiper = t),
        s.parentNode &&
          s.parentNode.host &&
          "SWIPER-CONTAINER" === s.parentNode.host.nodeName &&
          (t.isElement = !0);
      const i = () =>
        `.${(t.params.wrapperClass || "").trim().split(" ").join(".")}`;
      let a = (() => {
        if (s && s.shadowRoot && s.shadowRoot.querySelector) {
          return s.shadowRoot.querySelector(i());
        }
        return M(s, i())[0];
      })();
      return (
        !a &&
          t.params.createElements &&
          ((a = k("div", t.params.wrapperClass)),
          s.append(a),
          M(s, `.${t.params.slideClass}`).forEach((e) => {
            a.append(e);
          })),
        Object.assign(t, {
          el: s,
          wrapperEl: a,
          slidesEl:
            t.isElement && !s.parentNode.host.slideSlots
              ? s.parentNode.host
              : a,
          hostEl: t.isElement ? s.parentNode.host : s,
          mounted: !0,
          rtl: "rtl" === s.dir.toLowerCase() || "rtl" === I(s, "direction"),
          rtlTranslate:
            "horizontal" === t.params.direction &&
            ("rtl" === s.dir.toLowerCase() || "rtl" === I(s, "direction")),
          wrongRTL: "-webkit-box" === I(a, "display"),
        }),
        !0
      );
    }
    init(e) {
      const t = this;
      if (t.initialized) return t;
      if (!1 === t.mount(e)) return t;
      t.emit("beforeInit"),
        t.params.breakpoints && t.setBreakpoint(),
        t.addClasses(),
        t.updateSize(),
        t.updateSlides(),
        t.params.watchOverflow && t.checkOverflow(),
        t.params.grabCursor && t.enabled && t.setGrabCursor(),
        t.params.loop && t.virtual && t.params.virtual.enabled
          ? t.slideTo(
              t.params.initialSlide + t.virtual.slidesBefore,
              0,
              t.params.runCallbacksOnInit,
              !1,
              !0,
            )
          : t.slideTo(
              t.params.initialSlide,
              0,
              t.params.runCallbacksOnInit,
              !1,
              !0,
            ),
        t.params.loop && t.loopCreate(),
        t.attachEvents();
      const s = [...t.el.querySelectorAll('[loading="lazy"]')];
      return (
        t.isElement && s.push(...t.hostEl.querySelectorAll('[loading="lazy"]')),
        s.forEach((e) => {
          e.complete
            ? H(t, e)
            : e.addEventListener("load", (e) => {
                H(t, e.target);
              });
        }),
        R(t),
        (t.initialized = !0),
        R(t),
        t.emit("init"),
        t.emit("afterInit"),
        t
      );
    }
    destroy(e, t) {
      void 0 === e && (e = !0), void 0 === t && (t = !0);
      const s = this,
        { params: i, el: a, wrapperEl: n, slides: r } = s;
      return (
        void 0 === s.params ||
          s.destroyed ||
          (s.emit("beforeDestroy"),
          (s.initialized = !1),
          s.detachEvents(),
          i.loop && s.loopDestroy(),
          t &&
            (s.removeClasses(),
            a.removeAttribute("style"),
            n.removeAttribute("style"),
            r &&
              r.length &&
              r.forEach((e) => {
                e.classList.remove(
                  i.slideVisibleClass,
                  i.slideFullyVisibleClass,
                  i.slideActiveClass,
                  i.slideNextClass,
                  i.slidePrevClass,
                ),
                  e.removeAttribute("style"),
                  e.removeAttribute("data-swiper-slide-index");
              })),
          s.emit("destroy"),
          Object.keys(s.eventsListeners).forEach((e) => {
            s.off(e);
          }),
          !1 !== e &&
            ((s.el.swiper = null),
            (function (e) {
              const t = e;
              Object.keys(t).forEach((e) => {
                try {
                  t[e] = null;
                } catch (e) {}
                try {
                  delete t[e];
                } catch (e) {}
              });
            })(s)),
          (s.destroyed = !0)),
        null
      );
    }
    static extendDefaults(e) {
      A(ue, e);
    }
    static get extendedDefaults() {
      return ue;
    }
    static get defaults() {
      return de;
    }
    static installModule(e) {
      he.prototype.__modules__ || (he.prototype.__modules__ = []);
      const t = he.prototype.__modules__;
      "function" == typeof e && t.indexOf(e) < 0 && t.push(e);
    }
    static use(e) {
      return Array.isArray(e)
        ? (e.forEach((e) => he.installModule(e)), he)
        : (he.installModule(e), he);
    }
  }
  function me(e) {
    let { swiper: t, extendParams: s, on: i, emit: a } = e;
    s({
      navigation: {
        nextEl: null,
        prevEl: null,
        hideOnClick: !1,
        disabledClass: "swiper-button-disabled",
        hiddenClass: "swiper-button-hidden",
        lockClass: "swiper-button-lock",
        navigationDisabledClass: "swiper-navigation-disabled",
      },
    }),
      (t.navigation = { nextEl: null, prevEl: null });
    const n = (e) => (Array.isArray(e) ? e : [e]).filter((e) => !!e);
    function r(e) {
      let s;
      return e &&
        "string" == typeof e &&
        t.isElement &&
        ((s = t.el.querySelector(e)), s)
        ? s
        : (e &&
            ("string" == typeof e && (s = [...document.querySelectorAll(e)]),
            t.params.uniqueNavElements &&
              "string" == typeof e &&
              s.length > 1 &&
              1 === t.el.querySelectorAll(e).length &&
              (s = t.el.querySelector(e))),
          e && !s ? e : s);
    }
    function l(e, s) {
      const i = t.params.navigation;
      (e = n(e)).forEach((e) => {
        e &&
          (e.classList[s ? "add" : "remove"](...i.disabledClass.split(" ")),
          "BUTTON" === e.tagName && (e.disabled = s),
          t.params.watchOverflow &&
            t.enabled &&
            e.classList[t.isLocked ? "add" : "remove"](i.lockClass));
      });
    }
    function o() {
      const { nextEl: e, prevEl: s } = t.navigation;
      if (t.params.loop) return l(s, !1), void l(e, !1);
      l(s, t.isBeginning && !t.params.rewind),
        l(e, t.isEnd && !t.params.rewind);
    }
    function d(e) {
      e.preventDefault(),
        (!t.isBeginning || t.params.loop || t.params.rewind) &&
          (t.slidePrev(), a("navigationPrev"));
    }
    function c(e) {
      e.preventDefault(),
        (!t.isEnd || t.params.loop || t.params.rewind) &&
          (t.slideNext(), a("navigationNext"));
    }
    function p() {
      const e = t.params.navigation;
      if (
        ((t.params.navigation = (function (e, t, s, i) {
          return (
            e.params.createElements &&
              Object.keys(i).forEach((a) => {
                if (!s[a] && !0 === s.auto) {
                  let n = M(e.el, `.${i[a]}`)[0];
                  n ||
                    ((n = k("div", i[a])),
                    (n.className = i[a]),
                    e.el.append(n)),
                    (s[a] = n),
                    (t[a] = n);
                }
              }),
            s
          );
        })(t, t.originalParams.navigation, t.params.navigation, {
          nextEl: "swiper-button-next",
          prevEl: "swiper-button-prev",
        })),
        !e.nextEl && !e.prevEl)
      )
        return;
      let s = r(e.nextEl),
        i = r(e.prevEl);
      Object.assign(t.navigation, { nextEl: s, prevEl: i }),
        (s = n(s)),
        (i = n(i));
      const a = (s, i) => {
        s && s.addEventListener("click", "next" === i ? c : d),
          !t.enabled && s && s.classList.add(...e.lockClass.split(" "));
      };
      s.forEach((e) => a(e, "next")), i.forEach((e) => a(e, "prev"));
    }
    function u() {
      let { nextEl: e, prevEl: s } = t.navigation;
      (e = n(e)), (s = n(s));
      const i = (e, s) => {
        e.removeEventListener("click", "next" === s ? c : d),
          e.classList.remove(...t.params.navigation.disabledClass.split(" "));
      };
      e.forEach((e) => i(e, "next")), s.forEach((e) => i(e, "prev"));
    }
    i("init", () => {
      !1 === t.params.navigation.enabled ? h() : (p(), o());
    }),
      i("toEdge fromEdge lock unlock", () => {
        o();
      }),
      i("destroy", () => {
        u();
      }),
      i("enable disable", () => {
        let { nextEl: e, prevEl: s } = t.navigation;
        (e = n(e)),
          (s = n(s)),
          t.enabled
            ? o()
            : [...e, ...s]
                .filter((e) => !!e)
                .forEach((e) => e.classList.add(t.params.navigation.lockClass));
      }),
      i("click", (e, s) => {
        let { nextEl: i, prevEl: r } = t.navigation;
        (i = n(i)), (r = n(r));
        const l = s.target;
        if (
          t.params.navigation.hideOnClick &&
          !r.includes(l) &&
          !i.includes(l)
        ) {
          if (
            t.pagination &&
            t.params.pagination &&
            t.params.pagination.clickable &&
            (t.pagination.el === l || t.pagination.el.contains(l))
          )
            return;
          let e;
          i.length
            ? (e = i[0].classList.contains(t.params.navigation.hiddenClass))
            : r.length &&
              (e = r[0].classList.contains(t.params.navigation.hiddenClass)),
            a(!0 === e ? "navigationShow" : "navigationHide"),
            [...i, ...r]
              .filter((e) => !!e)
              .forEach((e) =>
                e.classList.toggle(t.params.navigation.hiddenClass),
              );
        }
      });
    const h = () => {
      t.el.classList.add(
        ...t.params.navigation.navigationDisabledClass.split(" "),
      ),
        u();
    };
    Object.assign(t.navigation, {
      enable: () => {
        t.el.classList.remove(
          ...t.params.navigation.navigationDisabledClass.split(" "),
        ),
          p(),
          o();
      },
      disable: h,
      update: o,
      init: p,
      destroy: u,
    });
  }
  function fe(e) {
    let t,
      s,
      { swiper: i, extendParams: a, on: n, emit: r, params: l } = e;
    (i.autoplay = { running: !1, paused: !1, timeLeft: 0 }),
      a({
        autoplay: {
          enabled: !1,
          delay: 3e3,
          waitForTransition: !0,
          disableOnInteraction: !1,
          stopOnLastSlide: !1,
          reverseDirection: !1,
          pauseOnMouseEnter: !1,
        },
      });
    let o,
      d,
      c,
      p,
      u,
      h,
      m,
      f,
      g = l && l.autoplay ? l.autoplay.delay : 3e3,
      v = l && l.autoplay ? l.autoplay.delay : 3e3,
      S = new Date().getTime();
    function w(e) {
      i &&
        !i.destroyed &&
        i.wrapperEl &&
        e.target === i.wrapperEl &&
        (i.wrapperEl.removeEventListener("transitionend", w), f || L());
    }
    const b = () => {
        if (i.destroyed || !i.autoplay.running) return;
        i.autoplay.paused ? (d = !0) : d && ((v = o), (d = !1));
        const e = i.autoplay.paused ? o : S + v - new Date().getTime();
        (i.autoplay.timeLeft = e),
          r("autoplayTimeLeft", e, e / g),
          (s = requestAnimationFrame(() => {
            b();
          }));
      },
      E = (e) => {
        if (i.destroyed || !i.autoplay.running) return;
        cancelAnimationFrame(s), b();
        let a = void 0 === e ? i.params.autoplay.delay : e;
        (g = i.params.autoplay.delay), (v = i.params.autoplay.delay);
        const n = (() => {
          let e;
          if (
            ((e =
              i.virtual && i.params.virtual.enabled
                ? i.slides.filter((e) =>
                    e.classList.contains("swiper-slide-active"),
                  )[0]
                : i.slides[i.activeIndex]),
            !e)
          )
            return;
          return parseInt(e.getAttribute("data-swiper-autoplay"), 10);
        })();
        !Number.isNaN(n) &&
          n > 0 &&
          void 0 === e &&
          ((a = n), (g = n), (v = n)),
          (o = a);
        const l = i.params.speed,
          d = () => {
            i &&
              !i.destroyed &&
              (i.params.autoplay.reverseDirection
                ? !i.isBeginning || i.params.loop || i.params.rewind
                  ? (i.slidePrev(l, !0, !0), r("autoplay"))
                  : i.params.autoplay.stopOnLastSlide ||
                    (i.slideTo(i.slides.length - 1, l, !0, !0), r("autoplay"))
                : !i.isEnd || i.params.loop || i.params.rewind
                  ? (i.slideNext(l, !0, !0), r("autoplay"))
                  : i.params.autoplay.stopOnLastSlide ||
                    (i.slideTo(0, l, !0, !0), r("autoplay")),
              i.params.cssMode &&
                ((S = new Date().getTime()),
                requestAnimationFrame(() => {
                  E();
                })));
          };
        return (
          a > 0
            ? (clearTimeout(t),
              (t = setTimeout(() => {
                d();
              }, a)))
            : requestAnimationFrame(() => {
                d();
              }),
          a
        );
      },
      T = () => {
        (S = new Date().getTime()),
          (i.autoplay.running = !0),
          E(),
          r("autoplayStart");
      },
      x = () => {
        (i.autoplay.running = !1),
          clearTimeout(t),
          cancelAnimationFrame(s),
          r("autoplayStop");
      },
      C = (e, s) => {
        if (i.destroyed || !i.autoplay.running) return;
        clearTimeout(t), e || (m = !0);
        const a = () => {
          r("autoplayPause"),
            i.params.autoplay.waitForTransition
              ? i.wrapperEl.addEventListener("transitionend", w)
              : L();
        };
        if (((i.autoplay.paused = !0), s))
          return h && (o = i.params.autoplay.delay), (h = !1), void a();
        const n = o || i.params.autoplay.delay;
        (o = n - (new Date().getTime() - S)),
          (i.isEnd && o < 0 && !i.params.loop) || (o < 0 && (o = 0), a());
      },
      L = () => {
        (i.isEnd && o < 0 && !i.params.loop) ||
          i.destroyed ||
          !i.autoplay.running ||
          ((S = new Date().getTime()),
          m ? ((m = !1), E(o)) : E(),
          (i.autoplay.paused = !1),
          r("autoplayResume"));
      },
      A = () => {
        if (i.destroyed || !i.autoplay.running) return;
        const e = y();
        "hidden" === e.visibilityState && ((m = !0), C(!0)),
          "visible" === e.visibilityState && L();
      },
      O = (e) => {
        "mouse" === e.pointerType &&
          ((m = !0), (f = !0), i.animating || i.autoplay.paused || C(!0));
      },
      P = (e) => {
        "mouse" === e.pointerType && ((f = !1), i.autoplay.paused && L());
      };
    n("init", () => {
      i.params.autoplay.enabled &&
        (i.params.autoplay.pauseOnMouseEnter &&
          (i.el.addEventListener("pointerenter", O),
          i.el.addEventListener("pointerleave", P)),
        y().addEventListener("visibilitychange", A),
        T());
    }),
      n("destroy", () => {
        i.el.removeEventListener("pointerenter", O),
          i.el.removeEventListener("pointerleave", P),
          y().removeEventListener("visibilitychange", A),
          i.autoplay.running && x();
      }),
      n("_freeModeStaticRelease", () => {
        (p || m) && L();
      }),
      n("_freeModeNoMomentumRelease", () => {
        i.params.autoplay.disableOnInteraction ? x() : C(!0, !0);
      }),
      n("beforeTransitionStart", (e, t, s) => {
        !i.destroyed &&
          i.autoplay.running &&
          (s || !i.params.autoplay.disableOnInteraction ? C(!0, !0) : x());
      }),
      n("sliderFirstMove", () => {
        !i.destroyed &&
          i.autoplay.running &&
          (i.params.autoplay.disableOnInteraction
            ? x()
            : ((c = !0),
              (p = !1),
              (m = !1),
              (u = setTimeout(() => {
                (m = !0), (p = !0), C(!0);
              }, 200))));
      }),
      n("touchEnd", () => {
        if (!i.destroyed && i.autoplay.running && c) {
          if (
            (clearTimeout(u),
            clearTimeout(t),
            i.params.autoplay.disableOnInteraction)
          )
            return (p = !1), void (c = !1);
          p && i.params.cssMode && L(), (p = !1), (c = !1);
        }
      }),
      n("slideChange", () => {
        !i.destroyed && i.autoplay.running && (h = !0);
      }),
      Object.assign(i.autoplay, { start: T, stop: x, pause: C, resume: L });
  }
  function ge() {
    let e = document.querySelectorAll(
      '[class*="__swiper"]:not(.swiper-wrapper)',
    );
    e &&
      e.forEach((e) => {
        e.parentElement.classList.add("swiper"),
          e.classList.add("swiper-wrapper");
        for (const t of e.children) t.classList.add("swiper-slide");
      });
  }
  Object.keys(pe).forEach((e) => {
    Object.keys(pe[e]).forEach((t) => {
      he.prototype[t] = pe[e][t];
    });
  }),
    he.use([
      function (e) {
        let { swiper: t, on: s, emit: i } = e;
        const a = E();
        let n = null,
          r = null;
        const l = () => {
            t &&
              !t.destroyed &&
              t.initialized &&
              (i("beforeResize"), i("resize"));
          },
          o = () => {
            t && !t.destroyed && t.initialized && i("orientationchange");
          };
        s("init", () => {
          t.params.resizeObserver && void 0 !== a.ResizeObserver
            ? t &&
              !t.destroyed &&
              t.initialized &&
              ((n = new ResizeObserver((e) => {
                r = a.requestAnimationFrame(() => {
                  const { width: s, height: i } = t;
                  let a = s,
                    n = i;
                  e.forEach((e) => {
                    let { contentBoxSize: s, contentRect: i, target: r } = e;
                    (r && r !== t.el) ||
                      ((a = i ? i.width : (s[0] || s).inlineSize),
                      (n = i ? i.height : (s[0] || s).blockSize));
                  }),
                    (a === s && n === i) || l();
                });
              })),
              n.observe(t.el))
            : (a.addEventListener("resize", l),
              a.addEventListener("orientationchange", o));
        }),
          s("destroy", () => {
            r && a.cancelAnimationFrame(r),
              n && n.unobserve && t.el && (n.unobserve(t.el), (n = null)),
              a.removeEventListener("resize", l),
              a.removeEventListener("orientationchange", o);
          });
      },
      function (e) {
        let { swiper: t, extendParams: s, on: i, emit: a } = e;
        const n = [],
          r = E(),
          l = function (e, s) {
            void 0 === s && (s = {});
            const i = new (r.MutationObserver || r.WebkitMutationObserver)(
              (e) => {
                if (t.__preventObserver__) return;
                if (1 === e.length) return void a("observerUpdate", e[0]);
                const s = function () {
                  a("observerUpdate", e[0]);
                };
                r.requestAnimationFrame
                  ? r.requestAnimationFrame(s)
                  : r.setTimeout(s, 0);
              },
            );
            i.observe(e, {
              attributes: void 0 === s.attributes || s.attributes,
              childList: void 0 === s.childList || s.childList,
              characterData: void 0 === s.characterData || s.characterData,
            }),
              n.push(i);
          };
        s({ observer: !1, observeParents: !1, observeSlideChildren: !1 }),
          i("init", () => {
            if (t.params.observer) {
              if (t.params.observeParents) {
                const e = (function (e, t) {
                  const s = [];
                  let i = e.parentElement;
                  for (; i; )
                    t ? i.matches(t) && s.push(i) : s.push(i),
                      (i = i.parentElement);
                  return s;
                })(t.hostEl);
                for (let t = 0; t < e.length; t += 1) l(e[t]);
              }
              l(t.hostEl, { childList: t.params.observeSlideChildren }),
                l(t.wrapperEl, { attributes: !1 });
            }
          }),
          i("destroy", () => {
            n.forEach((e) => {
              e.disconnect();
            }),
              n.splice(0, n.length);
          });
      },
    ]),
    window.addEventListener("load", function (e) {
      ge(),
        document.querySelector(".ceramics") &&
          new he(".ceramics__slider", {
            modules: [me, fe],
            autoplay: { delay: 3e3, disableOnInteraction: !1 },
            observer: !0,
            observeParents: !0,
            slidesPerView: 4,
            spaceBetween: 20,
            autoHeight: !0,
            speed: 800,
            loop: !0,
            navigation: {
              nextEl: ".swiper-button-next",
              prevEl: ".swiper-button-prev",
            },
            breakpoints: {
              320: { slidesPerView: 1, spaceBetween: 10 },
              500: { slidesPerView: 2, spaceBetween: 20 },
              900: { slidesPerView: 4, spaceBetween: 20 },
            },
            on: { init: function (e) {} },
          });
    });
  class ve {
    constructor(e) {
      (this.config = Object.assign({ logging: !0 }, e)),
        this.observer,
        !document.documentElement.classList.contains("watcher") &&
          this.scrollWatcherRun();
    }
    scrollWatcherUpdate() {
      this.scrollWatcherRun();
    }
    scrollWatcherRun() {
      document.documentElement.classList.add("watcher"),
        this.scrollWatcherConstructor(
          document.querySelectorAll("[data-watch]"),
        );
    }
    scrollWatcherConstructor(e) {
      if (e.length) {
        this.scrollWatcherLogging(
          `Проснулся, слежу за объектами (${e.length})...`,
        ),
          p(
            Array.from(e).map(function (e) {
              return `${e.dataset.watchRoot ? e.dataset.watchRoot : null}|${
                e.dataset.watchMargin ? e.dataset.watchMargin : "0px"
              }|${e.dataset.watchThreshold ? e.dataset.watchThreshold : 0}`;
            }),
          ).forEach((t) => {
            let s = t.split("|"),
              i = { root: s[0], margin: s[1], threshold: s[2] },
              a = Array.from(e).filter(function (e) {
                let t = e.dataset.watchRoot ? e.dataset.watchRoot : null,
                  s = e.dataset.watchMargin ? e.dataset.watchMargin : "0px",
                  a = e.dataset.watchThreshold ? e.dataset.watchThreshold : 0;
                if (
                  String(t) === i.root &&
                  String(s) === i.margin &&
                  String(a) === i.threshold
                )
                  return e;
              }),
              n = this.getScrollWatcherConfig(i);
            this.scrollWatcherInit(a, n);
          });
      } else
        this.scrollWatcherLogging("Сплю, нет объектов для слежения. ZzzZZzz");
    }
    getScrollWatcherConfig(e) {
      let t = {};
      if (
        (document.querySelector(e.root)
          ? (t.root = document.querySelector(e.root))
          : "null" !== e.root &&
            this.scrollWatcherLogging(
              `Эмм... родительского объекта ${e.root} нет на странице`,
            ),
        (t.rootMargin = e.margin),
        !(e.margin.indexOf("px") < 0 && e.margin.indexOf("%") < 0))
      ) {
        if ("prx" === e.threshold) {
          e.threshold = [];
          for (let t = 0; t <= 1; t += 0.005) e.threshold.push(t);
        } else e.threshold = e.threshold.split(",");
        return (t.threshold = e.threshold), t;
      }
      this.scrollWatcherLogging(
        "Ой ой, настройку data-watch-margin нужно задавать в PX или %",
      );
    }
    scrollWatcherCreate(e) {
      this.observer = new IntersectionObserver((e, t) => {
        e.forEach((e) => {
          this.scrollWatcherCallback(e, t);
        });
      }, e);
    }
    scrollWatcherInit(e, t) {
      this.scrollWatcherCreate(t), e.forEach((e) => this.observer.observe(e));
    }
    scrollWatcherIntersecting(e, t) {
      e.isIntersecting
        ? (!t.classList.contains("_watcher-view") &&
            t.classList.add("_watcher-view"),
          this.scrollWatcherLogging(
            `Я вижу ${t.classList}, добавил класс _watcher-view`,
          ))
        : (t.classList.contains("_watcher-view") &&
            t.classList.remove("_watcher-view"),
          this.scrollWatcherLogging(
            `Я не вижу ${t.classList}, убрал класс _watcher-view`,
          ));
    }
    scrollWatcherOff(e, t) {
      t.unobserve(e),
        this.scrollWatcherLogging(`Я перестал следить за ${e.classList}`);
    }
    scrollWatcherLogging(e) {
      this.config.logging && c(`[Наблюдатель]: ${e}`);
    }
    scrollWatcherCallback(e, t) {
      const s = e.target;
      this.scrollWatcherIntersecting(e, s),
        s.hasAttribute("data-watch-once") &&
          e.isIntersecting &&
          this.scrollWatcherOff(s, t),
        document.dispatchEvent(
          new CustomEvent("watcherCallback", { detail: { entry: e } }),
        );
    }
  }
  let Se = !1;
  setTimeout(() => {
    if (Se) {
      let e = new Event("windowScroll");
      window.addEventListener("scroll", function (t) {
        document.dispatchEvent(e);
      });
    }
  }, 0),
    $(".popular-products__slick-items").slick({
      infinite: !0,
      autoplay: !0,
      autoplaySpeed: 1500,
      slidesToShow: 3,
      variableWidth: !0,
      lazyLoad: "ondemand",
    });
  const we = document.querySelector(".delivery__button"),
    ye = document.querySelector(".delivery");
  ye &&
    we.addEventListener("click", function (e) {
      ye.classList.add("delivery_hidden");
    }),
    (window.FLS = !0),
    (function (e) {
      let t = new Image();
      (t.onload = t.onerror =
        function () {
          e(2 == t.height);
        }),
        (t.src =
          "data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAACyAgCdASoCAAIALmk0mk0iIiIiIgBoSygABc6WWgAA/veff/0PP8bA//LwYAAA");
    })(function (e) {
      let t = !0 === e ? "webp" : "no-webp";
      document.documentElement.classList.add(t);
    }),
    s.any() && document.documentElement.classList.add("touch"),
    (function () {
      let e = document.querySelector(".icon-menu");
      e &&
        e.addEventListener("click", function (e) {
          r && (l(), document.documentElement.classList.toggle("menu-open"));
        });
    })(),
    (function () {
      const e = document.querySelectorAll("[data-spollers]");
      if (e.length > 0) {
        const t = Array.from(e).filter(function (e, t, s) {
          return !e.dataset.spollers.split(",")[0];
        });
        t.length && a(t);
        let s = u(e, "spollers");
        function a(e, t = !1) {
          e.forEach((e) => {
            (e = t ? e.item : e),
              t.matches || !t
                ? (e.classList.add("_spoller-init"),
                  r(e),
                  e.addEventListener("click", l))
                : (e.classList.remove("_spoller-init"),
                  r(e, !1),
                  e.removeEventListener("click", l));
          });
        }
        function r(e, t = !0) {
          const s = e.querySelectorAll("[data-spoller]");
          s.length > 0 &&
            s.forEach((e) => {
              t
                ? (e.removeAttribute("tabindex"),
                  e.classList.contains("_spoller-active") ||
                    (e.nextElementSibling.hidden = !0))
                : (e.setAttribute("tabindex", "-1"),
                  (e.nextElementSibling.hidden = !1));
            });
        }
        function l(e) {
          const t = e.target;
          if (t.closest("[data-spoller]")) {
            const s = t.closest("[data-spoller]"),
              i = s.closest("[data-spollers]"),
              a = !!i.hasAttribute("data-one-spoller");
            i.querySelectorAll("._slide").length ||
              (a && !s.classList.contains("_spoller-active") && o(i),
              s.classList.toggle("_spoller-active"),
              n(s.nextElementSibling, 500)),
              e.preventDefault();
          }
        }
        function o(e) {
          const t = e.querySelector("[data-spoller]._spoller-active");
          t &&
            (t.classList.remove("_spoller-active"),
            i(t.nextElementSibling, 500));
        }
        s &&
          s.length &&
          s.forEach((e) => {
            e.matchMedia.addEventListener("change", function () {
              a(e.itemsArray, e.matchMedia);
            }),
              a(e.itemsArray, e.matchMedia);
          });
      }
    })(),
    new t({}),
    (function () {
      const e = document.querySelectorAll(
        "input[placeholder],textarea[placeholder]",
      );
      e.length &&
        e.forEach((e) => {
          e.dataset.placeholder = e.placeholder;
        }),
        document.body.addEventListener("focusin", function (e) {
          const t = e.target;
          ("INPUT" !== t.tagName && "TEXTAREA" !== t.tagName) ||
            (t.dataset.placeholder && (t.placeholder = ""),
            t.classList.add("_form-focus"),
            t.parentElement.classList.add("_form-focus"),
            g.removeError(t));
        }),
        document.body.addEventListener("focusout", function (e) {
          const t = e.target;
          ("INPUT" !== t.tagName && "TEXTAREA" !== t.tagName) ||
            (t.dataset.placeholder && (t.placeholder = t.dataset.placeholder),
            t.classList.remove("_form-focus"),
            t.parentElement.classList.remove("_form-focus"),
            t.hasAttribute("data-validate") && g.validateInput(t));
        });
    })(),
    (function (e) {
      const t = document.forms;
      if (t.length)
        for (const e of t)
          e.addEventListener("submit", function (e) {
            s(e.target, e);
          }),
            e.addEventListener("reset", function (e) {
              const t = e.target;
              g.formClean(t);
            });
      async function s(t, s) {
        if (0 === (e ? g.getErrors(t) : 0)) {
          if (t.hasAttribute("data-ajax")) {
            s.preventDefault();
            const e = t.getAttribute("action")
                ? t.getAttribute("action").trim()
                : "#",
              a = t.getAttribute("method")
                ? t.getAttribute("method").trim()
                : "GET",
              n = new FormData(t);
            t.classList.add("_sending");
            const r = await fetch(e, { method: a, body: n });
            if (r.ok) {
              await r.json();
              t.classList.remove("_sending"), i(t);
            } else alert("Ошибка"), t.classList.remove("_sending");
          } else t.hasAttribute("data-dev") && (s.preventDefault(), i(t));
        } else {
          s.preventDefault();
          const e = t.querySelector("._form-error");
          e && t.hasAttribute("data-goto-error") && h(e, !0, 1e3);
        }
      }
      function i(e) {
        document.dispatchEvent(
          new CustomEvent("formSent", { detail: { form: e } }),
        ),
          g.formClean(e),
          c(`[Формы]: ${"Форма отправлена!"}`);
      }
    })(!0),
    document.addEventListener("click", function (e) {
      let t = e.target;
      if (t.closest(".quantity__button")) {
        let e = parseInt(t.closest(".quantity").querySelector("input").value);
        t.classList.contains("quantity__button_plus")
          ? e++
          : (--e, e < 1 && (e = 1)),
          (t.closest(".quantity").querySelector("input").value = e);
      }
    }),
    (f.selectModule = new m({})),
    new ve({}),
    (function () {
      function e(e) {
        if ("click" === e.type) {
          const t = e.target;
          if (t.closest("[data-goto]")) {
            const s = t.closest("[data-goto]"),
              i = s.dataset.goto ? s.dataset.goto : "",
              a = !!s.hasAttribute("data-goto-header"),
              n = s.dataset.gotoSpeed ? s.dataset.gotoSpeed : "500";
            h(i, a, n), e.preventDefault();
          }
        } else if ("watcherCallback" === e.type && e.detail) {
          const t = e.detail.entry,
            s = t.target;
          if ("navigator" === s.dataset.watch) {
            const e = s.id,
              i =
                (document.querySelector("[data-goto]._navigator-active"),
                document.querySelector(`[data-goto="${e}"]`));
            t.isIntersecting
              ? i && i.classList.add("_navigator-active")
              : i && i.classList.remove("_navigator-active");
          }
        }
      }
      document.addEventListener("click", e),
        document.addEventListener("watcherCallback", e);
    })();
})();
