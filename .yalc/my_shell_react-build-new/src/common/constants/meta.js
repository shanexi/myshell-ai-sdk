"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.galleryMeta = exports.forumMeta = exports.workshopMeta = exports.exploreMeta = exports.settingsMeta = exports.privacyPolicyMeta = exports.dashboardMeta = exports.passcardMeta = exports.profileMeta = exports.myRewardMeta = exports.redemptionMeta = exports.earnMeta = exports.aippStoreMeta = exports.rewardCenterMeta = exports.defaultMeta = void 0;
const defaultOpenGraph = {
    images: [
        {
            url: 'https://image.myshell.ai/image/website/logo/20231113/logo.png',
            width: 200,
            height: 200
        }
    ],
    locale: 'en',
    type: 'website'
};
const createMeta = (title, description) => ({
    title,
    description,
    openGraph: {
        ...defaultOpenGraph,
        title,
        description
    }
});
const defaultMeta = createMeta('MyShell - Build, Share, and Own AI Chat.', 'MyShell is a decentralized and comprehensive platform for discovering, creating, and investing AI-native apps.');
exports.defaultMeta = defaultMeta;
const rewardCenterMeta = createMeta('Reward Center | MyShell AI', "Discover MyShell's Reward Center. Earn points, unlock rewards, and enhance your AI experience. Join our loyalty program today!");
exports.rewardCenterMeta = rewardCenterMeta;
const aippStoreMeta = createMeta('AIPP Store | MyShell AI', "Explore MyShell's AIPP Store for cutting-edge AI products and services. Use your points to access innovative technologies and enhance your digital experience.");
exports.aippStoreMeta = aippStoreMeta;
const earnMeta = createMeta('Point Carnival | MyShell AI', "Join the MyShell Point Carnival! Enjoy special promotions, exclusive rewards, and exciting point-boosting activities. Don't miss out on these limited-time offers!");
exports.earnMeta = earnMeta;
const redemptionMeta = createMeta('Reward Redemption | MyShell AI', 'Redeem your hard-earned MyShell points for amazing rewards. Browse our selection of digital goods, services, and experiences. Start redeeming today!');
exports.redemptionMeta = redemptionMeta;
const myRewardMeta = createMeta('Rewards History | MyShell AI', 'Access your MyShell rewards dashboard. View your point balance, redemption history, and available rewards. Maximize your MyShell experience!');
exports.myRewardMeta = myRewardMeta;
const profileMeta = createMeta('User Profile | MyShell AI', 'Update and manage your MyShell user profile. Customize your preferences, view your activity, and optimize your AI interaction experience.');
exports.profileMeta = profileMeta;
const passcardMeta = createMeta('Passcard Selection | MyShell AI', 'Unlock the power of your MyShell Passcard. Access exclusive features, track your progress, and showcase your MyShell achievements.');
exports.passcardMeta = passcardMeta;
const dashboardMeta = createMeta('User Dashboard - MyShell AI', 'Access your personalized MyShell User Dashboard. Monitor your AI interactions, manage your rewards, and explore new features all in one place.');
exports.dashboardMeta = dashboardMeta;
const privacyPolicyMeta = createMeta('Privacy Policy | MyShell AI', "Learn about MyShell's commitment to protecting your privacy. Read our comprehensive privacy policy to understand how we collect, use, and safeguard your data.");
exports.privacyPolicyMeta = privacyPolicyMeta;
const settingsMeta = createMeta('Personal Settings | MyShell AI', 'Tailor your MyShell experience with our Personal Settings. Adjust your preferences, manage notifications, and optimize your AI interactions for a personalized experience.');
exports.settingsMeta = settingsMeta;
const exploreMeta = createMeta('MyShell AI | Build, Share, and Own AI Chat.', 'MyShell is a decentralized and comprehensive platform for discovering, creating, and investing AI-native apps.');
exports.exploreMeta = exploreMeta;
const workshopMeta = createMeta('Widget Center | MyShell AI', 'Explore diverse widgets and use widgets to build your bot!');
exports.workshopMeta = workshopMeta;
const forumMeta = createMeta('Forum Center | MyShell AI', 'MyShell is a decentralized and comprehensive platform for discovering, creating, and investing AI-native apps.');
exports.forumMeta = forumMeta;
const galleryMeta = createMeta('Gallery | MyShell AI', 'Explore diverse widgets and use widgets to build your bot!');
exports.galleryMeta = galleryMeta;
