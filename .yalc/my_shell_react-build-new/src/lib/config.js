export const locales = ['en', 'zh', 'zh-tw', 'jp', 'es', 'ru', 'ko'];
export const defaultLocale = 'en';
export const PasscardData = [
    {
        header: 'basic_battle_pass.header',
        text: ['basic_battle_pass.text.0', 'basic_battle_pass.text.1', 'basic_battle_pass.text.2'],
        buttonText: 'currentLevel',
        level: 1,
        energy: '60',
        key: 'basic_battle_pass'
    },
    {
        header: 'standard_battle_pass.header',
        text: [
            'standard_battle_pass.text.0',
            'standard_battle_pass.text.1',
            'standard_battle_pass.text.2',
            'standard_battle_pass.text.3',
            'standard_battle_pass.text.4',
            'standard_battle_pass.text.5'
        ],
        buttonText: 'standard_battle_pass.buttonText',
        level: 2,
        energy: '200',
        key: 'standard_battle_pass'
    },
    {
        header: 'genesis_pass.header',
        text: [
            'genesis_pass.text.0',
            'genesis_pass.text.1',
            'genesis_pass.text.2',
            'genesis_pass.text.3',
            'genesis_pass.text.4',
            'genesis_pass.text.5',
            'genesis_pass.text.6'
        ],
        buttonText: 'genesis_pass.buttonText2',
        level: 3,
        energy: '600',
        key: 'genesis_pass'
    }
];
export const WorkShopConfig = {
    FilterData: [
        {
            title: 'Type',
            list: ['All Type']
        },
        {
            title: 'Function',
            list: ['Tools', 'Entertainment', 'Education']
        },
        {
            title: 'Language',
            list: ['Multilingual Text', 'Chinese', 'English', 'Japanese']
        }
    ]
};
