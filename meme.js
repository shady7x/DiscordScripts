var fInterval = setInterval(f, 500);

function f()
{
    let popout = document.getElementsByClassName("avatar-2Vndt_ wrapper-1VLyxH");
    let banner = document.getElementsByClassName("avatar-3QF_VA wrapper-1VLyxH");

    let sp = "";
    let sb = "";

    if (popout.length == 1)
        sp = popout[0].getAttribute("aria-label");
    if (banner.length == 1)
        sb = banner[0].getAttribute("aria-label");

    let color = "#FFFFFF";

    if (sp.indexOf(status))
        color = "#000000";

    let connect1 = document.getElementsByClassName("flex-2S1XBF flex-3BkGQD horizontal-112GEH horizontal-1Piu5- flex-3BkGQD directionRow-2Iu2A9 justifyStart-2Mwniq alignStretch-Uwowzr noWrap-hBpHBz buttonsWrapper-2ARRp1 horizontal-30-DXt").length;
    let connect2 = document.getElementsByClassName("flex-2S1XBF flex-3BkGQD horizontal-112GEH horizontal-1Piu5- flex-3BkGQD directionRow-2Iu2A9 justifyStart-2Mwniq alignEnd-2awoY_ noWrap-hBpHBz actionsProfile-31n1ca buttonsWrapper-2ARRp1 horizontal-30-DXt").length;
    if (connect1 == 1 || connect2 == 1)
        color = "#00FFFF";

    let backdrop = document.getElementsByClassName("backdrop-2ByYRN withLayer-2VVmpp");
    if (backdrop.length == 1)
        backdrop[0].setAttribute("style", "");

    document.getElementsByClassName("scroller-3X7KbA none-2-_0dP scrollerBase-_bVAAt")[0].style.backgroundColor = color;
}
