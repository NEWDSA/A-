import store from '@/store'

export function checkPermission(permissCode) {
    const Privileges = store.getters.userInfo.PermisstionCodes ?? [];
    if (permissCode && permissCode instanceof Array) {
        if (permissCode.length > 0) {
          // 判断当前登录用户是否有权限
          const hasPermission = Privileges.some(item => {
            return permissCode.includes(item)
          })
    
          return hasPermission;
        }
    } else {
        return false;
    }
}