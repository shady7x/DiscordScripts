var helper_interval = setInterval(helper, 10);
var dispatch_interval = setInterval(dispatcher, 1);

var show_hints = true;
var auto_dispatch = false;

var dispatched = false;

var win_google = null, win_yandex = null;

function helper()
{
	let collection = null;

	let img_collection = document.getElementsByClassName("inGameImg");
	if (img_collection.length > 0)
	{
		collection = img_collection;
	}
	else
	{
		let media_collection = document.getElementsByTagName("source");
		if (media_collection.length > 0)
		{
			collection = media_collection;
		}
	}

	let caption_collection = document.getElementsByClassName("tableCaption");
	if (caption_collection.length > 0 && show_hints)
	{
		if (collection != null) // image, audio, video
		{
			let hint = document.getElementById("hint_id");
			if (hint == null)
			{
				let src_decoded = decodeURIComponent(collection[0].src);

				let slice_start = 0;
				let slice_end = src_decoded.length;
				for (let i = src_decoded.length - 1; i >= 0; --i)
				{
					if (src_decoded[i] == '/')
					{
						slice_start = i;
						break;
					}
					if (src_decoded[i] == '.' && slice_end == src_decoded.length) // first occurrence
					{
						slice_end = i;
					}
				}

				let new_hint = document.createElement('div');
				new_hint.textContent = src_decoded.slice(slice_start + 1, slice_end);
				let styles = window.getComputedStyle(caption_collection[0]);
				let cssText = styles.cssText;
				if (!cssText)
				{
					cssText = Array.from(styles).reduce((str, property) => {
						return `${str}${property}:${styles.getPropertyValue(property)};`;
					}, '');
				}
				new_hint.style.cssText = cssText;
				new_hint.className = "hint_class";
				new_hint.id = "hint_id";
				document.body.append(new_hint);
				caption_collection[0].after(new_hint);

				if (collection == img_collection)
				{
					let hint_search = document.getElementById("hint_search");
					if (hint_search == null)
					{
						let new_ht = document.createElement('div');
						let stylest = window.getComputedStyle(caption_collection[0]);
						let cssTextt = stylest.cssText;
						if (!cssTextt)
						{
							cssTextt = Array.from(stylest).reduce((str, property) => {
								return `${str}${property}:${stylest.getPropertyValue(property)};`;
							}, '');
						}
						new_ht.style.cssText = cssTextt;
						new_ht.className = "hint_class";
						new_ht.id = "hint_search";
						document.body.append(new_ht);
						new_hint.after(new_ht);
						new_ht.appendChild(create_search_button(collection[0].src, "image"));
					}
				}
			}
		}
		else // text
		{
			let question_split = document.getElementsByClassName("animatableCharacter");
			let question_full = "";
			for (let i = 0; i < question_split.length; ++i)
			{
				question_full += question_split[i].textContent;
			}

			if (question_full.length > 0)
			{
				let question_words = question_full.split(' ', 32).join(' '); // max 32 words

				let hint_search = document.getElementById("hint_search");
				if (hint_search == null)
				{
					let new_hint = document.createElement('div');
					let styles = window.getComputedStyle(caption_collection[0]);
					let cssText = styles.cssText;
					if (!cssText)
					{
						cssText = Array.from(styles).reduce((str, property) => {
							return `${str}${property}:${styles.getPropertyValue(property)};`;
						}, '');
					}
					new_hint.style.cssText = cssText;
					new_hint.className = "hint_class";
					new_hint.id = "hint_search";
					document.body.append(new_hint);
					caption_collection[0].after(new_hint);
					new_hint.appendChild(create_search_button(question_words, "text"));
				}
			}
		}
	}
	else
	{
		let hints = document.getElementsByClassName("hint_class");
		for (let i = 0; i < hints.length; ++i)
		{
			hints[i].parentNode.removeChild(hints[i]);
		}
    
		if (document.hasFocus())
		{
			if (win_google != null) win_google.close();
			if (win_yandex != null) win_yandex.close();
		}
	}
}

function create_search_button(question, type)
{
	let gy_search = document.createElement("button");
	gy_search.textContent = "[SEARCH]";
	gy_search.onclick = function() {
		if (type == "image") question = encodeURI(question);
		win_google = window.open((type != "image" ? "https://www.google.com/search?q=" : "https://www.google.com/searchbyimage?image_url=") + question, 'popUpGoogle', 'height=500, width=700, left=-5, top=0');
		win_yandex = window.open((type != "image" ? "https://www.yandex.ru/search/?text=" : "https://yandex.ru/images/search?rpt=imageview&url=") + question, 'popUpYandex', 'height=500, width=700, left=700, top=0');
	};
	return gy_search;
}

document.addEventListener('keydown', function(e)
{
	if (e.keyCode == 38) show_hints = true;
	if (e.keyCode == 37) auto_dispatch = false;
	else if (e.keyCode == 39)
	{
		auto_dispatch = true;

		// fill answer
		let answer_element = document.getElementById("answerBoxWide");
		if (answer_element != null)
		{
			let hint = document.getElementById("hint_id");
			if (hint != null)
			{
				answer_element.value = hint.textContent.toLowerCase();
			}
		}
	}
});

document.addEventListener('keyup', function(e)
{
	if (e.keyCode == 40) show_hints = false;
	if (e.keyCode == 37 || e.keyCode == 39) auto_dispatch = false;
});

var dispatchMouseEvent = function(target, v_args)
{
	let e = document.createEvent("MouseEvents");
	e.initEvent.apply(e, Array.prototype.slice.call(arguments, 1));
	target.dispatchEvent(e);
};

function dispatcher()
{
	if (document.getElementsByClassName("rightBorder  animate").length > 0)
	{
		let button_collection = document.getElementsByClassName("playerButton");
		if (auto_dispatch && !dispatched && button_collection.length > 0)
		{
			//dispatchMouseEvent(button_collection[0], 'mousedown', true, true);
			dispatchMouseEvent(button_collection[0], 'click', true, true);
			//dispatchMouseEvent(button_collection[0], 'mouseup', true, true);
			dispatched = true;
		}
	}
	else
	{
		dispatched = false;
	}
}
