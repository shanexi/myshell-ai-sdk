import { parseDirective } from './remark.utils';

describe('parse', () => {
  it('parse directive', () => {
    const a = `::x-think{#1751358388436789 text="🔧 Calling tool: **requirements_create**&#10;"}`;
    const b = parseDirective(a);
    expect(b).toMatchInlineSnapshot(`
      {
        "children": [
          {
            "attributes": {
              "id": "1751358388436789",
              "text": "🔧 Calling tool: **requirements_create**
      ",
            },
            "children": [],
            "name": "x-think",
            "position": {
              "end": {
                "column": 82,
                "line": 1,
                "offset": 81,
              },
              "start": {
                "column": 1,
                "line": 1,
                "offset": 0,
              },
            },
            "type": "leafDirective",
          },
        ],
        "position": {
          "end": {
            "column": 82,
            "line": 1,
            "offset": 81,
          },
          "start": {
            "column": 1,
            "line": 1,
            "offset": 0,
          },
        },
        "type": "root",
      }
    `);
  });

  it('parse text directive in paragraph', () => {
    const a = `A :i[lovely]{.text-red-500} language know as :abbr[HTML]{title="HyperText Markup Language"}.`;
    const b = parseDirective(a);
    expect(b).toMatchInlineSnapshot(`
      {
        "children": [
          {
            "children": [
              {
                "position": {
                  "end": {
                    "column": 3,
                    "line": 1,
                    "offset": 2,
                  },
                  "start": {
                    "column": 1,
                    "line": 1,
                    "offset": 0,
                  },
                },
                "type": "text",
                "value": "A ",
              },
              {
                "attributes": {
                  "class": "text-red-500",
                },
                "children": [
                  {
                    "position": {
                      "end": {
                        "column": 12,
                        "line": 1,
                        "offset": 11,
                      },
                      "start": {
                        "column": 6,
                        "line": 1,
                        "offset": 5,
                      },
                    },
                    "type": "text",
                    "value": "lovely",
                  },
                ],
                "name": "i",
                "position": {
                  "end": {
                    "column": 28,
                    "line": 1,
                    "offset": 27,
                  },
                  "start": {
                    "column": 3,
                    "line": 1,
                    "offset": 2,
                  },
                },
                "type": "textDirective",
              },
              {
                "position": {
                  "end": {
                    "column": 46,
                    "line": 1,
                    "offset": 45,
                  },
                  "start": {
                    "column": 28,
                    "line": 1,
                    "offset": 27,
                  },
                },
                "type": "text",
                "value": " language know as ",
              },
              {
                "attributes": {
                  "title": "HyperText Markup Language",
                },
                "children": [
                  {
                    "position": {
                      "end": {
                        "column": 56,
                        "line": 1,
                        "offset": 55,
                      },
                      "start": {
                        "column": 52,
                        "line": 1,
                        "offset": 51,
                      },
                    },
                    "type": "text",
                    "value": "HTML",
                  },
                ],
                "name": "abbr",
                "position": {
                  "end": {
                    "column": 92,
                    "line": 1,
                    "offset": 91,
                  },
                  "start": {
                    "column": 46,
                    "line": 1,
                    "offset": 45,
                  },
                },
                "type": "textDirective",
              },
              {
                "position": {
                  "end": {
                    "column": 93,
                    "line": 1,
                    "offset": 92,
                  },
                  "start": {
                    "column": 92,
                    "line": 1,
                    "offset": 91,
                  },
                },
                "type": "text",
                "value": ".",
              },
            ],
            "position": {
              "end": {
                "column": 93,
                "line": 1,
                "offset": 92,
              },
              "start": {
                "column": 1,
                "line": 1,
                "offset": 0,
              },
            },
            "type": "paragraph",
          },
        ],
        "position": {
          "end": {
            "column": 93,
            "line": 1,
            "offset": 92,
          },
          "start": {
            "column": 1,
            "line": 1,
            "offset": 0,
          },
        },
        "type": "root",
      }
    `);
  });

  it('parse leaf directive with text content', () => {
    const a = `::button[🥰 generate]{#msg-id-generate.btn.btn-blue}`;
    const b = parseDirective(a);
    expect(b).toMatchInlineSnapshot(`
      {
        "children": [
          {
            "attributes": {
              "class": "btn btn-blue",
              "id": "msg-id-generate",
            },
            "children": [
              {
                "position": {
                  "end": {
                    "column": 21,
                    "line": 1,
                    "offset": 20,
                  },
                  "start": {
                    "column": 10,
                    "line": 1,
                    "offset": 9,
                  },
                },
                "type": "text",
                "value": "🥰 generate",
              },
            ],
            "name": "button",
            "position": {
              "end": {
                "column": 53,
                "line": 1,
                "offset": 52,
              },
              "start": {
                "column": 1,
                "line": 1,
                "offset": 0,
              },
            },
            "type": "leafDirective",
          },
        ],
        "position": {
          "end": {
            "column": 53,
            "line": 1,
            "offset": 52,
          },
          "start": {
            "column": 1,
            "line": 1,
            "offset": 0,
          },
        },
        "type": "root",
      }
    `);
  });

  it('parse container directive with nested content', () => {
    const a = `:::main{#readme}
Lorem:br
:::`;
    const b = parseDirective(a);
    expect(b).toMatchInlineSnapshot(`
      {
        "children": [
          {
            "attributes": {
              "id": "readme",
            },
            "children": [
              {
                "children": [
                  {
                    "position": {
                      "end": {
                        "column": 6,
                        "line": 2,
                        "offset": 22,
                      },
                      "start": {
                        "column": 1,
                        "line": 2,
                        "offset": 17,
                      },
                    },
                    "type": "text",
                    "value": "Lorem",
                  },
                  {
                    "attributes": {},
                    "children": [],
                    "name": "br",
                    "position": {
                      "end": {
                        "column": 9,
                        "line": 2,
                        "offset": 25,
                      },
                      "start": {
                        "column": 6,
                        "line": 2,
                        "offset": 22,
                      },
                    },
                    "type": "textDirective",
                  },
                ],
                "position": {
                  "end": {
                    "column": 9,
                    "line": 2,
                    "offset": 25,
                  },
                  "start": {
                    "column": 1,
                    "line": 2,
                    "offset": 17,
                  },
                },
                "type": "paragraph",
              },
            ],
            "name": "main",
            "position": {
              "end": {
                "column": 4,
                "line": 3,
                "offset": 29,
              },
              "start": {
                "column": 1,
                "line": 1,
                "offset": 0,
              },
            },
            "type": "containerDirective",
          },
        ],
        "position": {
          "end": {
            "column": 4,
            "line": 3,
            "offset": 29,
          },
          "start": {
            "column": 1,
            "line": 1,
            "offset": 0,
          },
        },
        "type": "root",
      }
    `);
  });
});
