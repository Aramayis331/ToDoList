function getToDoList() {
	let getLocalStorageList = localStorage.getItem('task');

	if(getLocalStorageList !== null) {
		return JSON.parse(getLocalStorageList);
	}else {
		return [];
	}
}
getToDoList();

function getIndexCheckedLocalSotrage() {
	let getIndexChecked = localStorage.getItem('taskChecked');

	if(getIndexChecked !== null) {
		return JSON.parse(getIndexChecked);
	}else {
		return [];
	}
}
getIndexCheckedLocalSotrage();

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
	let addClasList;
	
	arrayGetLocalStorageRefresh.map((el, i) => {
	let addClastListTrue = true;
	arrayTaskChecked = getIndexCheckedLocalSotrage();


	for(let j = 0; j < arrayTaskChecked.length; j++) {
		if(el === arrayTaskChecked[j]) {
			addClasList = 'addClassCheckBox';
			
			addClastListTrue = false;
		}
	}
	if(addClastListTrue === true) {
		addClasList = '';
	}

		htmlCatalog += `

			<div class='divElToDoList' draggable='true'>
				<div class='divIconCheckEl'>
					<div class='divChecked'>
						<i class="fas fa-check iconChecked"></i>
					</div>
					<div class='divTextEl'>
						<p class='textEl ${addClasList}'>${el}</p>
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
refreshList();


function del_chechedToDoList() {
	let arrayListGetLocalStorage = getToDoList();
	let iconDel = document.querySelectorAll('.iconDel');
	let divChecked = document.querySelectorAll('.divChecked');
	let addClassCheckBox = 'addClassCheckBox';
	let getArrayIndexCheckedLocalSotrage = getIndexCheckedLocalSotrage();


	iconDel.forEach((el, i) => {
		el.addEventListener('click', () => {
			let delArrayTask = arrayListGetLocalStorage.splice(i, 1);
			getArrayIndexCheckedLocalSotrage.forEach((el, k) => {
				if(delArrayTask[0] === el) {
					getArrayIndexCheckedLocalSotrage.splice(k, 1);
				}
			})
			localStorage.setItem('taskChecked', JSON.stringify(getArrayIndexCheckedLocalSotrage));
			localStorage.setItem('task', JSON.stringify(arrayListGetLocalStorage));
			document.querySelector('.divTextEror').style.display = 'none';
			refreshList();
		})
	})
	divChecked.forEach((el , i) => {
		let textEl = document.querySelectorAll('.textEl');
		el.addEventListener('click', () => {
				textEl[i].classList.toggle(addClassCheckBox);
				index = getArrayIndexCheckedLocalSotrage.indexOf(textEl[i].textContent)
				if(index === -1) {
					getArrayIndexCheckedLocalSotrage.push(textEl[i].textContent);
				}else {
					getArrayIndexCheckedLocalSotrage.splice(index, 1);
				}
				localStorage.setItem('taskChecked', JSON.stringify(getArrayIndexCheckedLocalSotrage));
		})
	})
}

// Drag And Drop //

let divElToDoList = document.querySelectorAll('.divElToDoList');
let divToDoList = document.querySelector('.divToDoList');
let dragStartIndex;
let dragEndIndex;
let listItems = [];

divElToDoList.forEach((el, i) => {
	el.addEventListener('dragstart', () => {
		el.classList.add('dragging');
		dragStartIndex = i;
	})
	el.addEventListener('dragend', () => {
		el.classList.remove('dragging');
	})
	el.addEventListener('dragover', element => {
		element.preventDefault();
	})
	el.addEventListener('dragenter', () => {
		el.classList.add('hovered');
	})
	el.addEventListener('dragleave', () => {
		el.classList.remove('hovered');
	})
	el.addEventListener('drop', () => {
		el.classList.remove('hovered');
		dragEndIndex = i;

		spawItems(dragStartIndex, dragEndIndex);
	})
})

function spawItems(fromIndex, toIndex) {
	


}


// let divElToDoList = document.querySelectorAll('.divElToDoList');
// let divToDoList = document.querySelector('.divToDoList');

// divElToDoList.forEach((el) => {
// 	el.addEventListener('dragstart', () => {
// 		el.classList.add('dragging');
// 	})
// 	el.addEventListener('dragend', () => {
// 		el.classList.remove('dragging');
// 	})
// })

// divToDoList.addEventListener('dragover', el => {
// 	el.preventDefault();
// 	let classDragging = document.querySelector('.dragging')
// 	divToDoList.appendChild(classDragging);
	
// })
