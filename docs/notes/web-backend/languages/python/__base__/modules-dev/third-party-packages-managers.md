# Python 第三方包管理

## pip

### 下载安装

pip 是 Python 的内置包管理工具，开箱即用无需下载

```zsh
% python --version                                                                      # [!code focus]
Python 3.10.0

% pip --version                                                                         # [!code focus]
pip 21.2.3 from [编译器所在路径]/3.10.0/lib/python3.10/site-packages/pip (python 3.10)
```

---

### 常用命令

|                                                        | 说明                                               |
| ------------------------------------------------------ | -------------------------------------------------- |
| `pip install -r requirements.txt`                      | 将记录在`requirements.txt`中的第三方包全部下载     |
| `pip freeze > requirements.txt`                        | 将安装到工作区内的第三方包记录到`requirements.txt` |
| `pip install [包名]`<br/>`pip install [包名]==[版本]`  | 下载指定的第三方包                                 |
| `pip uninstall [包名]`                                 | 卸载指定的第三方包                                 |
| `pip list`                                             | 查看所有已安装的第三方包                           |
| `pip show [包名]`<br/>`pip show [包名] \| grep [键名]` | 查看指定的第三方包的信息                           |
