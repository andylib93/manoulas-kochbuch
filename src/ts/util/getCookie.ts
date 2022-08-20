// stackoverflow.com/a/52406518/11160383
export const getCookie = (name: string): boolean => {
    var match = document.cookie.match(RegExp('(?:^|;\\s*)' + name + '=([^;]*)')); 
    return match ? true : false;
}
