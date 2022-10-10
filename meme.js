var fInterval = setInterval(f, 500);

function f()
{
	let color = "#FFFFFF";
	let wrapper = document.getElementsByClassName("wrapper-1VLyxH");
	
	if (wrapper.length > 0 && wrapper[wrapper.length - 1].style.width != "32px")
	{
		let aria_label = wrapper[wrapper.length - (wrapper[wrapper.length - 1].style.width == "16px" ? 2 : 1)].getAttribute("aria-label");
		
		if (aria_label.indexOf(status) != -1) // hidden
			color = gdraw;
		
		// connectSpotify
		if (document.getElementsByClassName("flex-2S1XBF flex-3BkGQD horizontal-112GEH horizontal-1Piu5- flex-3BkGQD directionRow-2Iu2A9 justifyStart-2Mwniq").length == 0x4)
			color = "#00FFFF";

		let backdrop = document.getElementsByClassName("backdrop-2ByYRN withLayer-2VVmpp");
		if (backdrop.length == 1) backdrop[0].setAttribute("style", "");
	}
	
	document.getElementsByClassName("scroller-3X7KbA none-2-_0dP scrollerBase-_bVAAt")[0].style.backgroundColor = color;
}
