'use strict'
const Route = use('Route')
const Database = use('Database')
const Post = use('App/Models/Post')
const User = use('App/Models/User')
const Tag = use('App/Models/Tag')
const { validateAll } = use('Validator')

class PostController {
  async index({ view }) {
    // const posts = await Post.all()
    const posts = await Post
      .query()
      // 关联查询user表
      .with('user', builder => {
        builder.select('id', 'username')
      })
      .with('user.profile')
      .fetch()

    return view.render('post.index', { posts: posts.toJSON() })
  }

  async create({
    view
  }) {
    // 查询全部用户
    const users = await User.all()
    // 查询全部标签
    const tags = await Tag.all()

    return view.render('post.create', {
      users: users.toJSON(),
      tags: tags.toJSON()
    })
  }

  // 创建
  async store({
    request,
    response,
    session
  }) {
    // 验证规则
    const rules = {
      title: 'required',
      content: 'required'
    }
    // 验证结果
    const validation = await validateAll(request.all(), rules)
    // 如果验证失败
    if (validation.fails()) {
      session.withErrors(validation.messages()).flashAll()

      return response.redirect('back')
    }

    // 获取到表单提交过来的参数
    const newPost = request.only(['title', 'content'])
    const tags = request.input('tags')
    // const postID = await Database.insert(newPost).into('posts')
    // console.log('postID: ', postID)
    // const post = await Post.create(newPost)
    // 根据提交的作者id 查询作者
    const user = await User.find(request.input('user_id'))
    const post = await user
      .posts()
      .create(newPost)

    await post
      .tags()
      .attach(tags)

    return response.redirect(`/posts/${ post.id }`)
  }

  // 查找
  async show({
    view,
    params
  }) {
    // const post = await Database
    //   .from('posts')
    //   .where('id', params.id)
    //   .first()

    const post = await Post.findOrFail(params.id)

    // 标签
    const tags = await post
      .tags()
      .select('id', 'title')
      .fetch()

    return view.render('post.show', {
      post,
      tags: tags.toJSON()
    })
  }

  // 修改
  async edit({
    view,
    params
  }) {
    // const post = await Database
    //   .from('posts')
    //   .where('id', params.id)
    //   .first()

    const _post = await Post.findOrFail(params.id)
    const _users = await User.all()
    const users = _users.toJSON()
    const _tags = await Tag.all()
    const tags = _tags.toJSON()

    await _post.load('tags')
    const post = _post.toJSON()
    const postTagIds = post.tags.map(tag => tag.id)

    const tagItems = tags.map(tag => {
      if (postTagIds.includes(tag.id)) {
        tag.checked = true
      }
    })

    const userItems = users.map(user => {
      if (user.id === post.user_id) {
        user.checked = true
      }
    })

    return view.render('post.edit', {
      post,
      tags,
      users
    })
  }

  // 更新
  async update({
    request,
    params,
    session,
    response
  }) {
    // const updatedPost = request.only(['title', 'content'])
    // await Database
    //   .table('posts')
    //   .where('id', params.id)
    //   .update(updatedPost)

    const { title, content, user_id, tags } = request.all()

    const post = await Post.findOrFail(params.id)
    post.merge({ title, content })
    post.save()

    const user = await User.find(user_id)
    await post.user().associate(user)

    // 同步tags状态
    await post.tags().sync(tags)

    session.flash({ 
      type: 'primary',
      message: `Post updated. 
      <a href="${ Route.url('PostController.show', { id: post.id }) }" 
      class="alert-link">Preview post.</a>`
    })

    return response.redirect('back')
  }

  // 删除
  async destroy({
    request,
    params
  }) {
    // await Database
    //   .table('posts')
    //   .where('id', params.id)
    //   .delete()
    const post = await Post.findOrFail(params.id)
    try {
      // 清除文章的关联标签，使用detach
      await post.tags().detach()
      await post.delete()
    } catch(error) {
      console.log(error)
    }

    return 'success'
  }
}

module.exports = PostController