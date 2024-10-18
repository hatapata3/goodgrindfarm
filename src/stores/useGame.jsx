import create from 'zustand'
import { subscribeWithSelector } from 'zustand/middleware'

// eslint-disable-next-line react-refresh/only-export-components
export default create(subscribeWithSelector((set) =>
{
    return {
        nav: 'none',
        onMenu: false,
        onCur: 'none',
        
        setNav: (target) =>
        {
            set((state) =>
            {
                if(state.nav !== target)
                    return { nav: target }
            
                return {}
            })
        },
        setMenu: (target) =>
        {
            set((state) =>
            {
                if(state.nav !== target)
                    return {onMenu: target}
                
                return{}
            })
        },
        setCur: (target) =>
        {
            set((state) =>
            {
                if(state.onCur !== target)
                    return {onCur: target}
                return{}
            })
        },
    }
}))