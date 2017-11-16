
import {FETCH_COMPANIES} from '../actions/types'

const initialState = [
    {
        Name: 'Philips',
        Admin: {Name: 'Pippi', Email: 'pippi@gmail.com'},
        //Reps: [{Name: 'Tommy', email: 'tommy@gmail.com'}, {Name: 'Annika', email: 'annika@gmail.com'}]
    },
    {
        Name: 'Miele',
        Admin: {Name: 'Karlsson', Email: 'karlsson@gmail.com'},
        //Reps: [{Name: 'Bosse', email: 'boose@gmail.com'}, {Name: 'Alfons', email: 'alfons@gmail.com'}]
    }
]

export default function (state = initialState, action = {}){
    switch (action.type) {
        case FETCH_COMPANIES:
            return [action.payload, ...state]
    }
    return state
}
