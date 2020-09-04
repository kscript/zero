interface anyObject<T = any> {
    [prop: string]: T
}

type HTMLElementX = HTMLElement & anyObject