<?php

/**
 * This file is part of the <name> project.
 *
 * (c) <yourname> <youremail>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

namespace Application\Sonata\ClassificationBundle\Entity;

use Sonata\ClassificationBundle\Entity\BaseTag as BaseTag;

/**
 * This file has been generated by the Sonata EasyExtends bundle ( http://sonata-project.org/bundles/easy-extends )
 *
 * References :
 *   working with object : http://www.doctrine-project.org/projects/orm/2.0/docs/reference/working-with-objects/en
 *
 * @author <yourname> <youremail>
 */
class Tag extends BaseTag
{
    /**
     * @var integer $id
     */
    protected $id;

    /**
     * Get id
     *
     * @return integer $id
     */
    public function getId()
    {
        return $this->id;
    }

    public function setName($name)
    {
        $this->name = $name;
        $char_map = array(
            // Latin
            '?' => 'A', '?' => 'A', '?' => 'A', '?' => 'A', '?' => 'A', '?' => 'A', '?' => 'AE', '?' => 'C',
            '?' => 'E', '?' => 'E', '?' => 'E', '?' => 'E', '?' => 'I', '?' => 'I', '?' => 'I', '?' => 'I',
            '?' => 'D', '?' => 'N', '?' => 'O', '?' => 'O', '?' => 'O', '?' => 'O', '?' => 'O', '?' => 'O',
            '?' => 'O', '?' => 'U', '?' => 'U', '?' => 'U', '?' => 'U', '?' => 'U', '?' => 'Y', '?' => 'TH',
            '?' => 'ss',
            '?' => 'a', '?' => 'a', '?' => 'a', '?' => 'a', '?' => 'a', '?' => 'a', '?' => 'ae', '?' => 'c',
            '?' => 'e', '?' => 'e', '?' => 'e', '?' => 'e', '?' => 'i', '?' => 'i', '?' => 'i', '?' => 'i',
            '?' => 'd', '?' => 'n', '?' => 'o', '?' => 'o', '?' => 'o', '?' => 'o', '?' => 'o', '?' => 'o',
            '?' => 'o', '?' => 'u', '?' => 'u', '?' => 'u', '?' => 'u', '?' => 'u', '?' => 'y', '?' => 'th',
            '?' => 'y',
            // Russian
            '�' => 'A', '�' => 'B', '�' => 'V', '�' => 'G', '�' => 'D', '�' => 'E', '�' => 'Yo', '�' => 'Zh',
            '�' => 'Z', '�' => 'I', '�' => 'J', '�' => 'K', '�' => 'L', '�' => 'M', '�' => 'N', '�' => 'O',
            '�' => 'P', '�' => 'R', '�' => 'S', '�' => 'T', '�' => 'U', '�' => 'F', '�' => 'H', '�' => 'C',
            '�' => 'Ch', '�' => 'Sh', '�' => 'Sh', '�' => '', '�' => 'Y', '�' => '', '�' => 'E', '�' => 'Yu',
            '�' => 'Ya',
            '�' => 'a', '�' => 'b', '�' => 'v', '�' => 'g', '�' => 'd', '�' => 'e', '�' => 'yo', '�' => 'zh',
            '�' => 'z', '�' => 'i', '�' => 'j', '�' => 'k', '�' => 'l', '�' => 'm', '�' => 'n', '�' => 'o',
            '�' => 'p', '�' => 'r', '�' => 's', '�' => 't', '�' => 'u', '�' => 'f', '�' => 'h', '�' => 'c',
            '�' => 'ch', '�' => 'sh', '�' => 'sh', '�' => '', '�' => 'y', '�' => '', '�' => 'e', '�' => 'yu',
            '�' => 'ya');
        $string = str_replace(array_keys($char_map), $char_map, $name);

//        $this->setSlug(self::slugify($name));
        $this->setSlug(self::slugify($string));
    }
}