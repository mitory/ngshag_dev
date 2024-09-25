import { validateMethod } from './validate.method'

export const eventMethod = {
    createSchedule, createNominationsElem
};

function createSchedule(schedule, events) {
    let index = 0

    schedule.forEach(el => {
      el.stages = [{name: 'Отборочный', nominations: []}, {name: 'Очный', nominations: []}]
      el.nominations.forEach(nom => {
        nom.stages.forEach(stage => {
          index = stage.stage_code === 'Отборочный' ? 0: 1;
          el.stages[index].nominations.push({
            id: nom.nomination.id,
            name: nom.nomination.name, 
            start: toStringDate(new Date(Date.parse(stage.start_date))), 
            end:   toStringDate(new Date(Date.parse(stage.end_date))),
            start_date: new Date(Date.parse(stage.start_date)),
            end_date: new Date(Date.parse(stage.end_date))
          })
        })
        const event = events.find(event => event.id === el.event.id && event.team_size > 1)
        if(event) {
          el.stages.unshift({name: 'Регистрационный', nominations: [{
            name: 'Формирование команд', 
            start: toStringDate(new Date(Date.parse(event.start_date))), 
            end:   toStringDate(new Date(Date.parse(event.register_end_date)))
          }]})
        }
      })
    })

    return schedule;
}

function createNominationsElem(nominations, event, is_active, user_tasks, schedule) {

    nominations.forEach(el => {
        el.event_id = event.id;
        el.is_team_event = event.team_size > 1;
        el.is_exist_task = (el.programs?.length ?? 0) > 0 && el.programs[0] != null;
        el.is_active = Boolean(is_active.find(id => id == el.id));
  
        const nom_stage_enddate = schedule[0]?.stages[0].nominations?.find(ch => el.id === ch.id)?.end_date;
        el.register_end_date = (el.is_team_event && new Date() < new Date(Date.parse(event.register_end_date)))
                                || (!el.is_team_event && new Date() <  nom_stage_enddate);
        el.enddate_register_time_text = el.is_team_event ? toStringDate(new Date(Date.parse(event.register_end_date))) 
                                                            : (nom_stage_enddate ? toStringDate(nom_stage_enddate) : false);
        
        if(el.is_exist_task){
          el.task = {};
          const user_task = user_tasks.find(task => task.task === el.programs[0]);
          if(user_task){
            el.task.status = user_task.is_accepted_display;
            el.task.is_accepted = user_task.is_accepted;
            if(['C', 'О'].includes(el.task.is_accepted)){
              el.task.button_text = 'Перейти к условию';
            }
          } else {
            el.task.button_text = 'Приступить к задаче';
          }
        }
      })

      return nominations;
}

function toStringDate (date){
    return validateMethod.toStringDate(date)
}