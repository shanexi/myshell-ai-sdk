import Masonry from 'react-masonry-css';

export const ImageChoice = () => {
  return (
    <div className="max-h-[300px] overflow-y-scroll rounded-lg border border-border-default-light bg-surface-default-light px-spacing-lg py-spacing-md">
      <Masonry
        breakpointCols={{
          default: 5,
          1112: 5,
          896: 3,
          568: 2,
        }}
        className="my-masonry-grid"
        columnClassName="my-masonry-grid_column"
      >
        {items.map((item) => (
          <div key={item.alt} className="relative bg-transparent">
            <img alt={item.alt} src={item.img} className="w-full rounded-lg" />
            <div className="absolute right-0 bottom-0 left-0 flex justify-center rounded-br-lg rounded-bl-lg bg-gradient-to-b from-transparent to-black px-[12px] pt-[20px] pb-[12px] text-text-static-white-light">
              {item.alt}
            </div>
          </div>
        ))}
      </Masonry>
    </div>
  );
};

const items: { img: string; alt: string; size: [number, number] }[] = [
  {
    img: 'https://sns-webpic-qc.xhscdn.com/202503061432/e034cbd2c0df1d325a88750e1a8feae2/1040g00831dn5glo3h0505pb71g26a0ep83jdvug!nc_n_webp_mw_1',
    alt: '1',
    size: [640, 853],
  },
  {
    img: 'https://sns-webpic-qc.xhscdn.com/202503061432/dfdec2e4ec0428bfa6ec9e6c3011c9cb/1040g00831dpl7dp8gu705pnqa3p7c984ns3s6jo!nc_n_webp_mw_1',
    alt: '2',
    size: [640, 640],
  },
  {
    img: 'https://sns-webpic-qc.xhscdn.com/202503061440/4255894c1c5e28f42c7e13091fd08d3d/1040g2sg31dlp5sfdgc005oid3m4417fnaeh1900!nc_n_webp_mw_1',
    alt: '3',
    size: [640, 853],
  },
  {
    img: 'https://sns-webpic-qc.xhscdn.com/202503061440/94e4f771259ec0291e95b7ebdf6d0846/1040g2sg31dpg40up12cg5p0j0le4iditfqb6nao!nc_n_webp_mw_1',
    alt: '4',
    size: [640, 1183],
  },
  {
    img: 'https://sns-webpic-qc.xhscdn.com/202503061442/c918b5f69df56d213fff6f5711575c0b/1040g00831dn5878q10005plr7d12u6a0hi6dpa8!nc_n_webp_mw_1',
    alt: '5',
    size: [640, 832],
  },
  {
    img: 'https://sns-webpic-qc.xhscdn.com/202503061448/b0462d029c6ea01fa5b244c6c51ea4b4/1040g00830n7sf7glli6g5p2r25dl2ccdneas2pg!nc_n_webp_mw_1',
    alt: '6',
    size: [640, 637],
  },
  {
    img: 'https://sns-webpic-qc.xhscdn.com/202503061448/b1f8bcf02303ddc9500bf53d66be698f/1040g00830n5gd97uli005o047cig83op0i7bbkg!nc_n_webp_mw_1',
    alt: '7',
    size: [640, 641],
  },
  {
    img: 'https://sns-webpic-qc.xhscdn.com/202503061450/363eaedfc84fcc44ba430f05849fb024/1000g0082e8matacha0005o44mcpg8hd49o70960!nc_n_webp_mw_1',
    alt: '8',
    size: [640, 480],
  },
];
