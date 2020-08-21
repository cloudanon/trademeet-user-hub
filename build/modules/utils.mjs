import { config } from './config.mjs';
import { x } from './xscript.mjs';

const utils = {
  acctype(obj){
    return x('div', {class: 'card'},
      x('div', {class: 'card-body'},
        x('div', {class: 'form-group'},
          x('label', 'profile type (or types seperated by comma) (developer / entrepeneur)'),
          x('input', {
            type: 'text',
            class: 'form-control',
            onkeyup(evt){
              obj.type = []
              let val = evt.target.value.split(',');

              for (let i = 0; i < val.length; i++) {
                if(val[i] !== 'developer' && val[i] !== 'entrepeneur'){
                  return;
                } else {
                  if(i < 2 && obj.type.indexOf(val[i]) === -1){
                    obj.type.push(val[i])
                  }
                }
              }
              console.log(obj.type)
              window.dispatchEvent(new Event('show-obj'));
            }
          })
        )
      )
    )
  },
  inp(lbl, obj){
    return x('div', {class: 'form-group'},
      x('label', lbl),
      x('input', {
        type: 'text',
        class: 'form-control',
        onkeyup(evt){
          let val = evt.target.value;
          obj[lbl] = val;
          window.dispatchEvent(new Event('show-obj'));
        }
      })
    )
  },
  ta(lbl, obj){
    return x('div', {class: 'form-group'},
      x('label', lbl),
      x('textarea', {
        rows: 6,
        class: 'form-control',
        onkeyup(evt){
          let val = evt.target.value;
          obj[lbl] = val;
          window.dispatchEvent(new Event('show-obj'));
        }
      })
    )
  },
  skills(idx, obj){
    let item = x('div', {class: 'card mb-4'},
      x('div', {class: 'card-body'},
        utils.inp('type', obj[idx]),
        utils.inp('years', obj[idx]),
        utils.inp('level', obj[idx])
      )
    )
    return item;
  },
  work_history(idx, obj){
    let item = x('div', {class: 'card mb-4'},
      x('div', {class: 'card-body'},
        utils.inp('title', obj[idx]),
        utils.inp('organization', obj[idx]),
        utils.inp('duration', obj[idx]),
        utils.inp('role', obj[idx])
      )
    )
    return item;
  },
  contact(idx, obj){
    let item = x('div', {class: 'card mb-4'},
      x('div', {class: 'card-body'},
        utils.inp('type', obj[idx]),
        utils.inp('data', obj[idx])
      )
    )
    return item;
  },
  showcase(idx, obj){
    let item = x('div', {class: 'card mb-4'},
      x('div', {class: 'card-body'},
        utils.inp('title', obj[idx]),
        utils.inp('description', obj[idx]),
        utils.inp('link', obj[idx])
      )
    )
    return item;
  },
  download(obj) {

    let url = URL.createObjectURL(
      new Blob([JSON.stringify(obj)], {
        type: ['application/json'].join(';')
      })
    ),
    link = x('a',{
      class: 'hide',
      href: url,
      target: '_blank',
      download: 'profile.json'
    });

    document.body.append(link);
    link.click();
    setTimeout(function(){
      URL.revokeObjectURL(url);
      url = link = null;
    },5000)
  },
}

export { utils }
