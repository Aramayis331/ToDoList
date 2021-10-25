function getToDoList() {
	let getLocalStorageList = localStorage.getItem('task');

	if(getLocalStorageList !== null) {
		return JSON.parse(getLocalStorageList);
	}else {
		return [];
	}
}
getToDoList()

function addToDoList() {
	let btnAddList = document.querySelector('.btnAddList');
	let divTextEror = document.querySelector('.divTextEror');

	btnAddList.addEventListener('click', () => {
		let arrayGetLocalStorage = getToDoList();
		let inputAddToDoList = document.querySelector('.inputAddToDoList');
		let inputAddToDoListValue = inputAddToDoList.value;
		let addInLocalStorage = true;
	
		arrayGetLocalStorage.forEach((el) => {
			if(el === inputAddToDoListValue) {
				divTextEror.style.display = 'inline';
				document.querySelector('.textEror').innerHTML = 'There is already one tasck';
				addInLocalStorage = false;
			}
			else if(inputAddToDoListValue === '') {
				divTextEror.style.display = 'inline';
				document.querySelector('.textEror').innerHTML = 'Please enter a tasck';
				addInLocalStorage = false;
			}
		})
		if((addInLocalStorage === true) && (inputAddToDoListValue !== '')) {
			arrayGetLocalStorage.push(inputAddToDoListValue);
			localStorage.setItem('task', JSON.stringify(arrayGetLocalStorage));
			refreshList();
			addInLocalStorage = true;
			divTextEror.style.display = 'none';
		}
		inputAddToDoList.value = '';
	})

}
addToDoList();

function refreshList() {
	let arrayGetLocalStorageRefresh = getToDoList();
	let divToDoList = document.querySelector('.divToDoList');
	if(arrayGetLocalStorageRefresh.length > 0) {
	let htmlCatalog = '';
	arrayGetLocalStorageRefresh.map((el) => {

		htmlCatalog += `

			<div class='divElToDoList' draggable='true'>
				<div class='divIconCheckEl'>
					<input type="checkbox" class="input_checkbox" id="idName${el}" name="zapomnit_signin">
					<label class="chechbox_label" for="idName${el}"></label>
					<div class='divTextEl'>
						<p class='textEl'>${el}</p>
					</div>
				</div>
				<div class='divIconDel'>
					<i class="fas fa-trash-alt iconDel"></i>
				</div>
			</div>

		`
		divToDoList.innerHTML = htmlCatalog;
	})
	}else {
		htmlCatalog = `
		<p class='textEl'>Пустой</p>
		`

		divToDoList.innerHTML = htmlCatalog;
	}
	del_chechedToDoList();
}
refreshList()

function del_chechedToDoList() {
	let arrayListGetLocalStorage = getToDoList();
	let iconDel = document.querySelectorAll('.iconDel');
	let chechbox_label = document.querySelectorAll('.chechbox_label');
	let addClassCheckBox = 'addClassCheckBox';

	iconDel.forEach((el, i) => {
		el.addEventListener('click', () => {
			arrayListGetLocalStorage.splice(i, 1);
			localStorage.setItem('task', JSON.stringify(arrayListGetLocalStorage));
			document.querySelector('.divTextEror').style.display = 'none';
			refreshList();
		})
	})
	chechbox_label.forEach((el , i) => {
		let textEl = document.querySelectorAll('.textEl');
		el.addEventListener('click', () => {
				textEl[i].classList.toggle(addClassCheckBox);
		})
	})

}