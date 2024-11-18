import { createMachine } from "xstate";

export const myMachine = createMachine({
    /** @xstate-layout N4IgpgJg5mDOIC5QAoC2BDAxgCwJYDswBKAOnwHsAXACXIDcwAnSAYgFkB5AVQGUBRDgDU+AJQDaABgC6iUAAdysXJVzl8skAA9EARgAcANhIBmACzGA7Jb079OiQb0AaEAE9dxnSQCcv74Z0DACY9AFYdMwBfSJc0LDxCUmx6JlZOXgEuABVJGSQQBSUVNQ1tBB1vUxJQ70sdGqDQzwMLAxd3BBsSUz9vCz0rCSGLaNiMHAJiMipaBmYIdm5+IVExHTz5RWVVdXyy-SMzS2tbGwdnN0QgoIlu3p1TCQsrHSDomJAKCDgNOInEjSFbYlPaIAC0bUuCAhJCGcPhCJGHz+CSmFBoKXmgK2xV2oDKpiC7UQA2qemMxiC3kapgMhNMelGIBRkySmMg2KKO1KiDMoRIFVCIWOelMTVCoWJCG8twk5MpxgMEipBiVBnekSAA */
    initial: "notHovered",
    states: {
        notHovered: {
            on: {
                MOUSEOVER: "hovered"
            }
        },
        hovered: {
            on: {
                MOUSEOUT: {
                    target: "notHovered"
                }
            }
        }
    }
})
