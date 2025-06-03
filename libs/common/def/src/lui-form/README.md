https://www.figma.com/design/QCuwDQJUCZ7dfLbsmlSCZj/Basic-Page?node-id=3064-100577&m=dev

属于 string 还是 object，这里定义的 convention 是，看 example 的值，type 需要和 example 保持一致

e.g. 上传图片，exmaple

```json
{
  "url": "",
  "tilte": ""
}
```

则是 object 的 variant。

风格选择（image choice），也放到 example，则和 上传图片一致的结构，但是为了不同 UI 展示，variant 区分。

> 其实是有区别的
>
> 1. example 不能是 optional
> 2. props 里增加 `name`

- 上传图片 x_object_variant_image_upload
- 下拉选择 x_string_variant_selector
- 文本框 x_string_variant_textarea
- 风格选择（image choice） x_object_variant_image_choice
