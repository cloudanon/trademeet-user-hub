
let config = {
  title: 'Trademeet user profile generator',
  css: [{
    href: './css/bootstrap.min.css',
    rel: 'stylesheet'
  },{
    href: './css/main.min.css',
    rel: 'stylesheet'
  }],
  template: {
    type: [],
    user: {
      firstname: "",
      lastname: "",
      age: "",
      gender: "",
      country: "",
      city: "",
      biography: ""
    },
    skills: [{
      type: "",
      years: "",
      level: ""
    }],
    work_history:[{
      title: "",
      organization: "",
      duration: "",
      role: ""
    }],
    contact: [{
      type: "",
      data: ""
    }],
    showcase:[{
      title: "",
      description: "",
      link: ""
    }]
  }
}

export { config }
