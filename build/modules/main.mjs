import { config } from './config.mjs';
import { x } from './xscript.mjs';
import { utils } from './utils.mjs';

document.title = config.title

let args = []
for (let i = 0; i < config.css.length; i++) {
  args.push(x('link', config.css[i]))
}

document.head.append(...args);

let obj = config.template,
res = x('code'),
appmain = x('app-main'),
navbar = x('nav', {class: 'navbar navbar-expand-lg mb-4'},
  x('div', {class: 'navbar-brand'}, config.title)
),
tpl = x('div', {class: 'container-fluid'},
  x('div', {class: 'row'},
    function(){

      let skillcnt = 0,
      workcnt = 0,
      contactcnt = 0,
      showcasecnt = 0,
      skillDiv = x('div',
        utils.skills(0, obj.skills)
      ),
      workDiv = x('div',
        utils.work_history(0, obj.work_history)
      ),
      contactDiv = x('div',
        utils.contact(0, obj.contact)
      ),
      showcaseDiv = x('div',
        utils.showcase(0, obj.showcase)
      ),
      userCard = x('div', {class: 'card-body'})


      let div = x('div', {class: 'col-lg-6'},
        x('h4', 'Profile type'),
        utils.acctype(obj),
        x('hr', {class: 'mt-4 mb-4'}),
        x('h4', 'User Data'),
        x('div',{class: 'card mb-4'},
          userCard
        )
      );

      for (let i = 0, keys = Object.keys(obj.user); i < keys.length; i++) {
        if(i !== keys.length-1){
          userCard.append(utils.inp(keys[i], obj.user))
        } else {
          userCard.append(utils.ta(keys[i], obj.user))
        }

      }

      div.append(
        x('hr', {class: 'mt-4 mb-4'}),
        x('h4', 'Skills Data',
          x('span', {
            class: 'cp float-right',
            onclick(){
              skillcnt++
              obj.skills.push({type: "",years: "",level: ""});
              skillDiv.append(utils.skills(skillcnt, obj.skills));
              window.dispatchEvent(new Event('show-obj'));
            }
          }, 'add new')
        ),
        skillDiv,
        x('hr', {class: 'mt-4 mb-4'}),
        x('h4', 'work history data',
          x('span', {
            class: 'cp float-right',
            onclick(){
              workcnt++
              obj.work_history.push({title: "",organization: "",duration: "",role: ""});
              workDiv.append(utils.work_history(workcnt, obj.work_history));
              window.dispatchEvent(new Event('show-obj'));
            }
          }, 'add new')
        ),
        workDiv,
        x('hr', {class: 'mt-4 mb-4'}),
        x('h4', 'contact data',
          x('span', {
            class: 'cp float-right',
            onclick(){
              contactcnt++
              obj.contact.push({type: "",data: ""});
              contactDiv.append(utils.contact(contactcnt, obj.contact));
              window.dispatchEvent(new Event('show-obj'));
            }
          }, 'add new')
        ),
        contactDiv,
        x('hr', {class: 'mt-4 mb-4'}),
        x('h4', 'Showcase data',
          x('span', {
            class: 'cp float-right',
            onclick(){
              showcasecnt++
              obj.showcase.push({title: "",description: "",link: ""});
              showcaseDiv.append(utils.showcase(showcasecnt, obj.showcase));
              window.dispatchEvent(new Event('show-obj'));
            }
          }, 'add new')
        ),
        showcaseDiv
      )

      return div;
    },
    x('div', {class: 'col-lg-6'},
      x('div', {class: 'preview'},
        x('pre', res)
      ),
      x('button', {
        class: 'btn btn-outline-primary',
        onclick(){
          fetch('./update', {
              method: 'POST',
              headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Sec-Fetch-Dest': 'object',
                'Sec-Fetch-mode': 'cors'
              },
              body: JSON.stringify(obj,0,2)
            }).then(function(res){
              if (res.status >= 200 && res.status < 300) {
                return res.json();
              } else {
                return Promise.reject(new Error(res.statusText))
              }
            }).then(function(data){
              console.log(data)
            }).catch(function(err){
              console.error(err)
            })

        }
      }, 'Update'),
      x('button', {
        class: 'btn btn-outline-primary float-right',
        onclick(){
          utils.download(obj);
        }
      }, 'Download')
    )
  )
)

window.addEventListener('show-obj', function(){
  res.textContent = JSON.stringify(obj,0,2)
})

appmain.append(navbar, tpl)
document.body.append(appmain)

window.dispatchEvent(new Event('show-obj'));
