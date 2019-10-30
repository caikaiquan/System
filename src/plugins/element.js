import Vue from 'vue'
import { 
    Button, 
    Input, 
    Menu, 
    Submenu, 
    MenuItem, 
    MenuItemGroup, 
    DatePicker, 
    Select, 
    Option, 
    Table, 
    TableColumn, 
    Radio,
    RadioGroup,
    CheckboxGroup,
    Checkbox
} from 'element-ui'

import CollapseTransition from 'element-ui/lib/transitions/collapse-transition';

Vue.component(CollapseTransition.name, CollapseTransition)

Vue.use(Button)
Vue.use(Input)
Vue.use(Menu)
Vue.use(Submenu)
Vue.use(MenuItem)
Vue.use(MenuItemGroup)
Vue.use(DatePicker)
Vue.use(Select)
Vue.use(Option)
Vue.use(Table)
Vue.use(TableColumn)
Vue.use(RadioGroup)
Vue.use(Radio)
Vue.use(CheckboxGroup)
Vue.use(Checkbox)



