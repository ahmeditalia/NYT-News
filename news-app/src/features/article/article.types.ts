import { dateFormat } from "../../shared/utils"



export type multimediaType = {
    url: string,
    format: string,
    height: number,
    width: number,
    type: string,
    subtype: string,
    caption: string,
    copyright?: string
}

export type articleType = {
    title: string,
    byline: string,
    multimedia: multimediaType[],
    published_date: string,
    section: string,
    abstract: string,
    url: string,

}





export const modify = (articles: any[] )=>{

    return articles.map( article => {
        return {
            title: article.headline.main,
            byline: article.byline.original,
            multimedia: article.multimedia.map( (media: { url: any; crop_name: any; height: any; width: any; type: any; subtype: any; caption: any }) =>{
                return {
                    url: `https://static01.nyt.com/${media.url}`,
                    format: media.crop_name,
                    height: media.height,
                    width: media.width,
                    type: media.type,
                    subtype: media.subtype,
                    caption: media.caption,
                }
            }),
            published_date: dateFormat(article.pub_date),
            section: article.section_name,
            abstract: article.abstract,
            url: article.web_url
        };
    })
}