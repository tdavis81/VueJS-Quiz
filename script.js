
const store = new Vuex.Store({
  state: {
    count: 0
  },
  mutations: {
    increment (state) {
      state.count++
    }
  }
})


const Dashboard = { 
  data () {
		return {
			questions: [],
			percentage: 0,
			answer: ""
		}
	},
	created () {
    	fetch('https://api.myjson.com/bins/1civ7s')
			.then(response => response.json())
			.then(json => {
			this.questions = json.questions
			
		});
	},
	methods: { 
    checkAnswer(a,index) {
				if(this.questions[index].answer == a){
					alert('correct')
					store.commit('increment')
				} else {
					alert('incorrect')
				}
				this.questions.splice(index, 1)
				if(this.questions.length ==0){
					window.location.href = 'https://firebaseloginvuejs--tdavis81.repl.co/#/results'
				}
    }
	},
	
  template: 
	`
	<div> 
		
		
		<ol>
		<li v-for="(question,index) in questions"> 
			{{question.text}} 
			<input type="text" @keyup="answer = $event.target.value"/> 
			<button @click="checkAnswer(answer,index)">Check Answer</button>
		</li>
		</ol>

		
	
	</div>
	
	`
}

const Results = { 
  data () {
    return {
      count: store.state.count
    }
  },
  template: `<div> You got {{ count }} questions right </div>`
}


const routes = [
  { path: '/dashboard', component: Dashboard },
  { path: '/results', component: Results }
]


const router = new VueRouter({
  routes 
})


const app = new Vue({
	methods: {
    handleSubmit() {
			window.location.href = 'https://firebaseloginvuejs--tdavis81.repl.co/#/dashboard'
		}
  },
	router
	
}).$mount('#app')


function hideBtn() {
	let a = document.getElementById('enterBtn');
	a.style.display = 'none';
}