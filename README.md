# Personal Programming Notes

## Assets

### Online Tools

|                 | Link URL                                                                                                                                                                                                                                                                                                 |
| --------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Image Editor    | [photoroom](https://app.photoroom.com/create)                                                                                                                                                                                                                                                            |
| Skill Logo Icon | [iconify](https://icon-sets.iconify.design/skill-icons/)                                                                                                                                                                                                                                                 |
| Art Images      | [pinterest](https://cl.pinterest.com/search/pins/?q=%E8%8B%B1%E9%9B%84%E8%81%94%E7%9B%9F&rs=autocomplete_bubble&b_id=BMdL1_x9a2WUAAAAAAAAAABRt7f0rR_ImPuJikA2ofhZkvfO9vAsKiWbSmTCebG_SEEeq72yK0jcIuaHvTfKwXeUuYGZ_3qB0zdN-TUrlTB15RyFVGR4jfFf59fgIbh5ng&source_id=Pti340jM&top_pin_id=12736811441668908) |

### Static Assets

- Skill Logo Icon Image: `300 * 300`
- Skill Logo Background Image: `2000 * 1000`

## Deploy

### GitHub Pages

1. navigate to github repo's **Settings > Pages**
2. select option of **Build and deployment > Source** to **GitHub Actions**
3. navigate to github repo's **Settings > Environments**
4. click **github-pages** then add branch `deploy_github_pages` ( which want to be deployed ) to **Deployment branches and tags**
5. make sure to set the `base` of configurations to github repo name
6. commit then push to remote `main` branch
7. merge `main` branch to `deploy_github_pages` branch
8. then push the `deploy_github_pages` branch to remote
