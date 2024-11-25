'use strict';
const { filter } = hexo.extend;
const cheerio = require('cheerio');

/**
 * 在页面插入新顶部图
 * @param {cheerio.Root} $ Root
 */
function insertTopImg($) {
    const header = $('#page-header');
    if (header.length === 0) return;
    const background = header.css('background-image');
    if (!background) return;
    $('#post, #page, #archive, #tag, #category').prepend(`<div class="top-img" style="background-image: ${background};"></div>`);
}

// 修改 HTML
filter.register('after_render:html', (str, data) => {
    const $ = cheerio.load(str, {
        decodeEntities: false
    });

    if (data.page && data.page.no_top_img) {
        return str; // 如果设置了 noTopImg，直接返回原始 HTML
    }

    insertTopImg($);
    return $.html();
});