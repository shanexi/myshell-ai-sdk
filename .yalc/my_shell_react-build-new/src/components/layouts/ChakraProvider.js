"use strict";
'use client';
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ChakraProvider = ChakraProvider;
const jsx_runtime_1 = require("react/jsx-runtime");
const next_js_1 = require("@chakra-ui/next-js");
const react_1 = require("@chakra-ui/react");
const theme_1 = __importDefault(require("@chakra-ui/theme"));
const { Button, Modal, Spinner, Avatar, Input, Tag, Divider, Progress, Slider, Form, FormError, Alert, Heading, Menu, Switch, Textarea, Select, Table, Tooltip, Checkbox, Radio, Skeleton, Popover, NumberInput, Accordion } = theme_1.default.components;
const theme = (0, react_1.extendBaseTheme)({
    colors: {
        brand: {
            50: '#EBEEFE',
            100: '#D7DEFE',
            200: '#AFBCFD',
            300: '#8D9FFC',
            400: '#657EFB',
            500: 'var(--primary)',
            600: '#062EF4',
            700: '#0523B8',
            800: '#031677',
            900: '#020B3C',
            950: '#01061E'
        }
    },
    components: {
        Switch,
        Button,
        Modal,
        Spinner,
        Avatar,
        Input,
        Tag,
        Divider,
        Progress,
        Slider,
        Form,
        FormError,
        Alert,
        Heading,
        Menu,
        Textarea,
        Select,
        Table,
        Tooltip,
        Checkbox,
        Radio,
        Skeleton,
        Popover,
        NumberInput,
        Accordion
    }
});
require("@/styles/chakra.css");
function ChakraProvider({ children }) {
    return ((0, jsx_runtime_1.jsx)(next_js_1.CacheProvider, { children: (0, jsx_runtime_1.jsx)(react_1.ChakraBaseProvider, { theme: theme, children: children }) }));
}
