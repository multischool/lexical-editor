import { $createTweetNode, $isTweetNode, TweetNode, } from '../nodes/embeds/tweet-node';
export const TWEET = {
    dependencies: [TweetNode],
    export: (node) => {
        if (!$isTweetNode(node)) {
            return null;
        }
        return `<tweet id="${node.getId()}" />`;
    },
    regExp: /<tweet id="([^"]+?)"\s?\/>\s?$/,
    replace: (textNode, _1, match) => {
        const [, id] = match;
        const tweetNode = $createTweetNode(id);
        textNode.replace(tweetNode);
    },
    type: 'element',
};
//# sourceMappingURL=markdown-tweet-transformer.js.map