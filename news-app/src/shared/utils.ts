
export const dateFormat = (date: string): string=>{
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(date).toLocaleDateString( "en-US" ,options as any)
}