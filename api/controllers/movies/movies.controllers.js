import { ResService } from "../../../services/resHandler.service.js";
import axios from 'axios'
import dotenv from 'dotenv'
import NodeCache from 'node-cache'
dotenv.config()
const base_url = 'https://www.omdbapi.com?type=movie'
const apikey = process.env.apikey
const myCache = new NodeCache({ stdTTL: 60 * 60 * 24 })
export class MovieController {

    static async getDefault(req, res) {
        try {
            if (myCache.has('movies')) {
                ResService.handleSuccess(res, JSON.parse(myCache.get('movies')))
            } else {
                const movies = await axios.get(`${base_url}&&s=the k&apikey=${apikey}`)
                if (movies?.data?.Search) {
                    myCache.set('movies', JSON.stringify(movies.data.Search))
                    ResService.handleSuccess(res, movies.data.Search)
                } else {
                    ResService.handleSuccess(res, movies.data)
                }
            }
        } catch (err) {
            ResService.handleErr(res, err)
        }
    }

    static async searchByName(req, res) {
        try {
            const { title } = req.query
            const movies = await axios.get(`${base_url}&&s=${title}&apikey=${apikey}`)
            ResService.handleSuccess(res, movies.data)
        } catch (err) {
            ResService.handleErr(res, err)

        }
    }

    static async getFullInfo(req, res) {
        try {
            const { movieId } = req.params
            let fullMovie = null
            if (myCache.has(movieId)) {
                fullMovie = JSON.parse(myCache.get(movieId))
            } else {
                const movie = await axios.get(`${base_url}&&i=${movieId}&apikey=${apikey}`)
                fullMovie = movie.data
                myCache.set(movieId, JSON.stringify(fullMovie))
            }
            ResService.handleSuccess(res, fullMovie)

        } catch (err) {
            ResService.handleErr(res, err)
        }
    }
}
