import fs from "fs";
import { KarabinerRules } from "./types";
import { createHyperSubLayers, app, open, rectangle } from "./utils";

const rules: KarabinerRules[] = [
  // Define the Hyper key itself
  {
    description: "Hyper Key (⌃⌥⇧⌘)",
    manipulators: [
      {
        description: "Caps Lock -> Hyper Key",
        from: {
          key_code: "caps_lock",
          modifiers: {
            optional: ["any"],
          },
        },
        to: [
          {
            set_variable: {
              name: "hyper",
              value: 1,
            },
          },
        ],
        to_after_key_up: [
          {
            set_variable: {
              name: "hyper",
              value: 0,
            },
          },
        ],
        to_if_alone: [
          {
            key_code: "escape",
          },
        ],
        type: "basic",
      },
      //      {
      //        type: "basic",
      //        description: "Disable CMD + Tab to force Hyper Key usage",
      //        from: {
      //          key_code: "tab",
      //          modifiers: {
      //            mandatory: ["left_command"],
      //          },
      //        },
      //        to: [
      //          {
      //            key_code: "tab",
      //          },
      //        ],
      //      },
    ],
  },
  ...createHyperSubLayers({
    spacebar: open(
      "raycast://extensions/stellate/mxstbr-commands/create-notion-todo"
    ),
    // b = "B"rowse
    b: {
      t: open("https://twitter.com"),
      // Quarterly "P"lan
      y: open("https://news.ycombinator.com"),
      r: open("https://reddit.com"),
      x: open("https://x.com"),
    },
    // o = "Open" applications
    o: {
      1: app("1Password"),
      a: app("Arc"),
      g: app("GoLand"),
      c: app("ChatGPT"),
      // Since it's eaiser lol
      q: app("Cursor"),
      d: app("DataGrip"),
      s: app("Slack"),
      e: app("Spark Desktop"),
      n: app("Notion"),
      w: app("Warp"),
      t: app("TickTick"),
      z: app("zoom.us"),
      // "M"essages
      m: app("Texts"),
      f: app("Finder"),
      // "i"Message
      i: app("WhatsApp"),
      p: app("Linear"),
    },

    w: {
      semicolon: {
        description: "Window: Hide",
        to: [
          {
            key_code: "h",
            modifiers: ["right_command"],
          },
        ],
      },
      y: rectangle("previous-display"),
      o: rectangle("next-display"),
      k: rectangle("top-half"),
      j: rectangle("bottom-half"),
      h: rectangle("left-half"),
      l: rectangle("right-half"),
      f: rectangle("maximize"),
      u: {
        description: "Window: Previous Tab",
        to: [
          {
            key_code: "tab",
            modifiers: ["right_control", "right_shift"],
          },
        ],
      },
      i: {
        description: "Window: Next Tab",
        to: [
          {
            key_code: "tab",
            modifiers: ["right_control"],
          },
        ],
      },
      n: {
        description: "Window: Next Window",
        to: [
          {
            key_code: "grave_accent_and_tilde",
            modifiers: ["right_command"],
          },
        ],
      },
      b: {
        description: "Window: Back",
        to: [
          {
            key_code: "open_bracket",
            modifiers: ["right_command"],
          },
        ],
      },
      // Note: No literal connection. Both f and n are already taken.
      m: {
        description: "Window: Forward",
        to: [
          {
            key_code: "close_bracket",
            modifiers: ["right_command"],
          },
        ],
      },
      d: {
        description: "Window: Next display",
        to: [
          {
            key_code: "right_arrow",
            modifiers: ["right_control", "right_option", "right_command"],
          },
        ],
      },
    },

    // s = "System"
    s: {
      u: {
        to: [
          {
            key_code: "volume_increment",
          },
        ],
      },
      j: {
        to: [
          {
            key_code: "volume_decrement",
          },
        ],
      },
      i: {
        to: [
          {
            key_code: "display_brightness_increment",
          },
        ],
      },
      k: {
        to: [
          {
            key_code: "display_brightness_decrement",
          },
        ],
      },
      l: {
        to: [
          {
            key_code: "q",
            modifiers: ["right_control", "right_command"],
          },
        ],
      },
      p: {
        to: [
          {
            key_code: "play_or_pause",
          },
        ],
      },
      semicolon: {
        to: [
          {
            key_code: "fastforward",
          },
        ],
      },
      e: {
        to: [
          {
            // Emoji picker
            key_code: "spacebar",
            modifiers: ["right_control", "right_command"],
          },
        ],
      },
      // Turn on Elgato KeyLight
      y: {
        to: [
          {
            shell_command: `curl -H 'Content-Type: application/json' --request PUT --data '{ "numberOfLights": 1, "lights": [ { "on": 1, "brightness": 100, "temperature": 215 } ] }' http://192.168.8.84:9123/elgato/lights`,
          },
        ],
      },
      h: {
        to: [
          {
            shell_command: `curl -H 'Content-Type: application/json' --request PUT --data '{ "numberOfLights": 1, "lights": [ { "on": 0, "brightness": 100, "temperature": 215 } ] }' http://192.168.8.84:9123/elgato/lights`,
          },
        ],
      },
      // "D"o not disturb toggle
      d: open(`raycast://extensions/yakitrak/do-not-disturb/toggle`),
    },

    // v = "moVe" which isn't "m" because we want it to be on the left hand
    // so that hjkl work like they do in vim
    v: {
      h: {
        to: [{ key_code: "left_arrow" }],
      },
      j: {
        to: [{ key_code: "down_arrow" }],
      },
      k: {
        to: [{ key_code: "up_arrow" }],
      },
      l: {
        to: [{ key_code: "right_arrow" }],
      },
      // Magicmove via homerow.app
      m: {
        to: [{ key_code: "f", modifiers: ["right_control"] }],
      },
      // Scroll mode via homerow.app
      s: {
        to: [{ key_code: "j", modifiers: ["right_control"] }],
      },
      d: {
        to: [{ key_code: "d", modifiers: ["right_shift", "right_command"] }],
      },
      u: {
        to: [{ key_code: "page_down" }],
      },
      i: {
        to: [{ key_code: "page_up" }],
      },
    },

    // c = Musi*c* which isn't "m" because we want it to be on the left hand
    c: {
      p: {
        to: [{ key_code: "play_or_pause" }],
      },
      n: {
        to: [{ key_code: "fastforward" }],
      },
      b: {
        to: [{ key_code: "rewind" }],
      },
    },

    // r = "Raycast"
    r: {
      n: open(
        "raycast://extensions/raycast/raycast-notes/raycast-notes?context=%7B%22id%22:%2223A09FFA-A5A9-4AAD-9324-E2DC127C8B4C%22%7D"
      ),
      e: open(
        "raycast://extensions/raycast/emoji-symbols/search-emoji-symbols"
      ),
      c: open("raycast://extensions/raycast/system/open-camera"),
      p: open("raycast://extensions/raycast/raycast/confetti"),
      a: open("raycast://extensions/raycast/raycast-ai/ai-chat"),
      s: open("raycast://extensions/raycast/snippets/search-snippets"),
      h: open(
        "raycast://extensions/raycast/clipboard-history/clipboard-history"
      ),
      t: open("raycast://extensions/appest/ticktick/inbox"),
      l: open("raycast://extensions/raycast/system/lock-screen"),
    },
  }),
];

fs.writeFileSync(
  "karabiner.json",
  JSON.stringify(
    {
      global: {
        show_in_menu_bar: false,
      },
      profiles: [
        {
          name: "Default",
          complex_modifications: {
            rules,
          },
        },
      ],
    },
    null,
    2
  )
);
